import { Database } from "bun:sqlite";
import indexHtml from "./index.html";
import "temporal-polyfill/global";
import puppeteer from "puppeteer";

const db = new Database("db.sqlite", { create: true });

db.exec(`CREATE TABLE IF NOT EXISTS app_settings (
  id INTEGER PRIMARY KEY,
  session_id STRING
)`);

type MealType = "breakfast" | "lunch" | "dinner";

interface MealTime {
  date: Temporal.PlainDate;
  meal: MealType;
}

const lunchEndTime = Temporal.PlainTime.from("14:00:00");
const dinnerEndTime = Temporal.PlainTime.from("20:00:00");

function parseMeal(meal: string): MealType {
  if (meal.startsWith("早")) return "breakfast";
  if (meal.startsWith("晚")) return "dinner";
  return "lunch";
}

const relativeDateRegex =
  /^(?:(?<relative>大?前|昨|今|明|大?后)天?|(?<week>上|上上|下|下下|这|本)?个?(?:周|星期|礼拜)(?<weekday>一|二|三|四|五|六|日|天)|(?:(?:(?<year>\d{4})[-.年])?(?<month>\d{1,2})[-.月])?(?<date>\d{1,2})[日号]?)?(?<meal>早(?:上|饭|餐)?|中午|午(?:饭|餐)|晚(?:上|饭|餐)?|(?:待|过)会儿?|下顿)?(?<future>吃(?:什么|啥)[?？]?)?$/;

const weekOffsetMap: Record<string, number> = {
  上: -1,
  下: 1,
  上上: -2,
  下下: 2,
  这: 0,
  本: 0,
};
const weekdayMap: Record<string, number> = {
  一: 1,
  二: 2,
  三: 3,
  四: 4,
  五: 5,
  六: 6,
  日: 7,
  天: 7,
};
const relativeDateOffsetMap: Record<string, number> = {
  大前: -3,
  前: -2,
  昨: -1,
  今: 0,
  明: 1,
  后: 2,
  大后: 3,
};

function parseMealTime(description: string): MealTime {
  const now = Temporal.Now.zonedDateTimeISO();

  const match = relativeDateRegex.exec(description);
  if (!match) {
    throw new Error(`Unrecognized meal time description: ${description}`);
  }
  let {
    relative,
    week,
    weekday,
    year,
    month,
    date: dateText,
    meal: mealText,
    future,
  } = match.groups ?? {};

  let date: Temporal.PlainDate;

  if (dateText) {
    const dayNumber = parseInt(dateText);
    let monthNumber: number;
    let yearNumber: number;
    if (!month) {
      monthNumber = now.month;
      yearNumber = now.year;
      if (dayNumber < now.day && future) {
        monthNumber = now.add({ months: 1 }).month;
        yearNumber = now.add({ months: 1 }).year;
      }
    } else if (!year) {
      monthNumber = parseInt(month);
      yearNumber = now.year;
      if (monthNumber < now.month && future) {
        yearNumber = now.add({ years: 1 }).year;
      }
    } else {
      monthNumber = parseInt(month);
      yearNumber = parseInt(year);
    }
    date = Temporal.PlainDate.from({
      year: yearNumber,
      month: monthNumber,
      day: dayNumber,
    });
  } else if (weekday) {
    const nowWeekday = now.dayOfWeek;
    const targetWeekday = weekdayMap[weekday];
    if (!week) {
      let offset = targetWeekday - nowWeekday;
      if (offset < 0 && future) {
        offset += 7;
      }
      date = now.add({ days: offset }).toPlainDate();
    } else {
      const weekOffset = weekOffsetMap[week];
      const offset = targetWeekday - nowWeekday + weekOffset * 7;
      date = now.add({ days: offset }).toPlainDate();
    }
  } else {
    if (!relative) {
      if (Temporal.PlainTime.compare(now.toPlainTime(), dinnerEndTime) >= 0) {
        relative = "明";
        mealText ||= "中午";
      } else {
        relative = "今";
        if (!mealText) {
          if (
            Temporal.PlainTime.compare(now.toPlainTime(), lunchEndTime) >= 0
          ) {
            mealText = "晚上";
          } else {
            mealText = "中午";
          }
        }
      }
    }
    const offset = relativeDateOffsetMap[relative];
    date = now.add({ days: offset }).toPlainDate();
  }
  mealText ||= "中午";
  const meal = parseMeal(mealText);
  return { date, meal };
}

const sessionIdQuery = db.query<{ session_id: string }, []>(
  "SELECT session_id FROM app_settings WHERE id = 1",
);

type MenuResponse =
  | {
      code: 200;
      data: MenuData;
      message: "success";
      timestamp: 1745515330690;
      messageKey: "";
    }
  | {
      code: 0;
      data: unknown;
      message: string;
    };

export interface MenuData {
  date?: string;
  buildingCode: string;
  buildingName: null | string;
  cityCode: string;
  cityName: string;
  isShowTimeLabel: true;
  mealTimeCode: "BREAKFAST" | "LUNCH" | "DINNER";
  menuSites: MenuSiteData[] | null;
  hidingReason: string | null;
  mealTimeName: string;
  menuStartTime: string;
  menuEndTime: string;
  showNewUI: boolean;
}
export interface MenuSiteData {
  siteId: number;
  siteLabel: string;
  boxMealItems: FoodItem[];
  selfServiceItems: FoodItem[];
}
export type KindCode =
  | "KIND_SELF_SERVICE"
  | "KIND_SET_MEAL"
  | "KIND_AFTERNOON_TEA";
export interface FoodItem {
  additionalInfo: null;
  description: string | null;
  sku: null;
  tags: unknown;
  foodName: string;
  typeName: string;
  kindName: string;
  kindCode: KindCode;
}

const dateFormat = Intl.DateTimeFormat("zh-CN", {
  dateStyle: "long",
});

const browser = await puppeteer.launch();
const page = await browser.newPage();

const server = Bun.serve({
  routes: {
    "/": indexHtml,
    "/api/session_id": {
      POST: async (request) => {
        const body = await request.json();
        if (body && body.session_id) {
          const sessionId = body.session_id;
          db.exec(
            `INSERT OR REPLACE INTO app_settings (id, session_id) VALUES (1, ?)`,
            [sessionId],
          );
          return new Response("Session ID saved", { status: 200 });
        } else {
          return new Response("Invalid request", { status: 400 });
        }
      },
    },
    "/api/menu": async (request) => {
      const query = new URL(request.url).searchParams.get("query") || "";
      const { date, meal } = parseMealTime(query);
      const sessionId = sessionIdQuery.get()?.session_id;
      if (sessionId) {
        const response = await fetch(
          `https://aplus.bytedance.com/smartcanteen/app/mini-program/menu/detail/v3`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Cookie: `session_id=${sessionId}`,
              "X-Client-Type": "h5",
            },
            body: JSON.stringify({
              buildingCode: "MDBD00000302",
              timeCode: meal,
              menuDate: date.toString(),
            }),
          },
        );
        const responseJson: MenuResponse = await response.json();
        if (responseJson?.code !== 200) {
          return new Response(responseJson.message, { status: 502 });
        }
        responseJson.data.date = dateFormat.format(date);
        if (request.headers.get("Accept")?.includes("application/json")) {
          return new Response(JSON.stringify(responseJson), {
            headers: {
              "Content-Type": "application/json",
            },
          });
        }
        await page.evaluate(
          (data) =>
            window.dispatchEvent(
              new CustomEvent("menuData", {
                detail: data,
              }),
            ),
          responseJson.data,
        );
        await Bun.sleep(100);
        const image = await page.$("#root").then((e) =>
          e!.screenshot({
            quality: 100,
            optimizeForSpeed: true,
            type: "webp",
          }),
        );
        return new Response(image, {
          headers: {
            "Content-Type": "image/webp",
            // "Content-Disposition": `inline; filename="menu.webp"`,
          },
        });
      } else {
        return new Response("Session ID not found", { status: 412 });
      }
    },
    "/*": () => new Response("Not found", { status: 404 }),
  },
  port: process.env.PORT || 8012,
} as const);
const homepage = `http://${server.hostname}:${server.port}`;
await page.goto(homepage, { waitUntil: "networkidle0" });
console.log(`Server running at ${homepage}`);

process.on("exit", () => {
  browser.close();
});

["SIGINT", "SIGTERM", "SIGQUIT"].forEach((signal) => {
  process.on(signal, () => {
    browser.close().finally(() => {
      process.exit(0);
    });
  });
});
