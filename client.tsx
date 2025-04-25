import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import type { FoodItem, KindCode, MenuData, MenuSiteData } from "./server";
// @ts-expect-error
import logo from "./bytedance.png";
import "./style.css";
const exampleData: MenuData = {
  buildingCode: "MDBD00000302",
  buildingName: null,
  cityCode: "MDCY00000001",
  cityName: "北京市",
  hidingReason: "未加载",
  isShowTimeLabel: true,
  mealTimeCode: "LUNCH",
  mealTimeName: "午餐",
  menuEndTime: "14:00:00",
  menuSites: null,
  menuStartTime: "12:00:00",
  showNewUI: false,
  date: "2025年4月27日",
};

declare global {
  interface WindowEventMap {
    menuData: CustomEvent<MenuData>;
  }
}
declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

interface SiteProps {
  kind: SiteKind;
  name: string;
  note: string | null;
  items: FoodItem[];
}

const Site = (props: SiteProps) => {
  const isSet =
    props.kind === SiteKind.SetMeal || props.kind === SiteKind.SetMealMuslim;
  return (
    <fieldset className="site-item">
      <legend className="site-title">
        {props.name}
        {isSet && props.note && <span className="site-tag">{props.note}</span>}
      </legend>
      <ul className="item-list">
        {props.items.map((item) => (
          <li key={item.foodName}>
            {String.fromCodePoint(item.typeName.codePointAt(0) ?? 0x20)}{" "}
            {item.foodName}
          </li>
        ))}
      </ul>
    </fieldset>
  );
};

const Category = (props: { kind: SiteKind; sites: SiteProps[] }) => {
  const isMuslim =
    props.kind === SiteKind.SelfServiceMuslim ||
    props.kind === SiteKind.SetMealMuslim;
  const sitesPerRow = isMuslim ? 1 : props.kind === SiteKind.SelfService ? props.sites.length : 4;
  return (
    <div
      className="category-item"
      style={{ "--chroma": siteKindColorChroma[props.kind] }}
    >
      <h2 className="category-title">{siteKindText[props.kind]}</h2>
      <div className="site-list" style={{ "--sites-per-row": sitesPerRow }}>
        {props.sites.map((site) => (
          <Site key={site.name} {...site} />
        ))}
      </div>
    </div>
  );
};

enum SiteKind {
  SetMeal = "SetMeal",
  SelfService = "SelfService",
  SetMealMuslim = "SetMealMuslim",
  SelfServiceMuslim = "SelfServiceMuslim",
  Other = "Other",
}

const siteKindText: Record<SiteKind, string> = {
  [SiteKind.SetMeal]: "套餐",
  [SiteKind.SelfService]: "自助",
  [SiteKind.SetMealMuslim]: "清真套餐",
  [SiteKind.SelfServiceMuslim]: "清真自助",
  [SiteKind.Other]: "其他",
};

const siteKindColorChroma: Record<SiteKind, number> = {
  [SiteKind.SetMeal]: 255,
  [SiteKind.SelfService]: 39,
  [SiteKind.SetMealMuslim]: 111,
  [SiteKind.SelfServiceMuslim]: 183,
  [SiteKind.Other]: 327,
};

const muslimSiteNames = [
  "亚克西烤肉",
  "新疆拌面",
  "禧好牛肉面",
  "九碗三行子",
  "九碗十三花",
];

const getSiteProps = (site: MenuSiteData): SiteProps => {
  const items = [...site.boxMealItems, ...site.selfServiceItems];
  const kindCode = items[0]?.kindCode;
  let note = null;

  let name = site.siteLabel;
  if (name.startsWith("B1 ")) {
    name = name.slice(3);
  }
  let match = name.match(/^(.*)【(.*)】$/);
  if (match) {
    name = match[1];
    note = match[2];
  }
  let kind: SiteKind;
  if (kindCode === "KIND_SET_MEAL") {
    kind = muslimSiteNames.includes(name)
      ? SiteKind.SetMealMuslim
      : SiteKind.SetMeal;
  } else if (kindCode === "KIND_SELF_SERVICE") {
    kind = muslimSiteNames.includes(name)
      ? SiteKind.SelfServiceMuslim
      : SiteKind.SelfService;
  } else {
    kind = SiteKind.Other;
  }
  return {
    kind,
    name,
    note,
    items,
  };
};

const App = () => {
  const [menu, setMenu] = useState<MenuData>(exampleData);

  useEffect(() => {
    const handler = (event: CustomEvent<MenuData>) => {
      setMenu(event.detail);
    };
    window.addEventListener("menuData", handler);
    return () => {
      window.removeEventListener("menuData", handler);
    };
  }, []);
  if (!menu.menuSites) {
    return <div className="top-title failed">{menu.hidingReason}</div>;
  }
  const categories = Object.groupBy(
    menu.menuSites.map<SiteProps>(getSiteProps),
    (site) => site.kind,
  );
  return (
    <>
      <h1 className="top-title">
        <span>
          <img className="top-title-logo" src={logo} alt="字节跳动" />
          食堂菜单
        </span>
        <ul className="top-subtitle">
          <li>大钟寺1号楼</li>
          <li>{menu.date}</li>
          <li>{menu.mealTimeName}</li>
        </ul>
      </h1>
      <div className="category-list">
        <Category
          kind={SiteKind.SetMeal}
          sites={categories[SiteKind.SetMeal] ?? []}
        />
        <Category
          kind={SiteKind.SetMealMuslim}
          sites={categories[SiteKind.SetMealMuslim] ?? []}
        />
        <Category
          kind={SiteKind.SelfService}
          sites={categories[SiteKind.SelfService] ?? []}
        />
        <Category
          kind={SiteKind.SelfServiceMuslim}
          sites={categories[SiteKind.SelfServiceMuslim] ?? []}
        />
      </div>
    </>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
