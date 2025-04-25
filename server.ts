import { Database } from "bun:sqlite";
const db = new Database("db.sqlite", { create: true });

db.exec(`CREATE TABLE IF NOT EXISTS app_settings (
  id INTEGER PRIMARY KEY,
  session_id STRING
)`);

const sessionIdQuery = db.query<{ session_id: string }, []>("SELECT session_id FROM app_settings WHERE id = 1");


// menu return structure:
/*
{
  "code": 200,
  "data": {
    ...
  },
  "message": "success",
  "timestamp": 1745515330690,
  "messageKey": ""
}
*/

interface MenuData {
  menuSites: MenuSite[] | null;
  hidingReason: string;
  mealTimeName: string;
}
interface MenuSite {
  siteId: number;
  siteLabel: string;
  boxMealItems: FoodItem[];
  selfServiceItems: FoodItem[];
}
interface FoodItem {
  foodName: string;
  typeName: string;
  kindName: string;
  kindCode: "KIND_SELF_SERVICE" | "KIND_SET_MEAL";
}

Bun.serve({
  static: {},
  fetch: async (request) => {
    const method = request.method;
    const url = new URL(request.url);
    if (method === "POST" && url.pathname === "/api/session_id") {
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
    }
    if (method === "GET" && url.pathname === "/api/menu") {
      const sessionId = sessionIdQuery.get()?.session_id;
      if (sessionId) {
        return fetch(`https://aplus.bytedance.com/smartcanteen/app/mini-program/menu/detail/v3`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cookie": `session_id=${sessionId}`,
            "X-Client-Type": "h5",
          },
          body: JSON.stringify({
            buildingCode: "MDBD00000302",
            timeCode: "dinner",
            menuDate: "2025-04-21"
          })
        });
      } else {
        return new Response("Session ID not found", { status: 412 });
      }
    }
    return new Response("Not found", { status: 404 });
  },
  port: process.env.PORT || 3000,
});
