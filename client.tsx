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
  hidingReason: null,
  isShowTimeLabel: true,
  mealTimeCode: "LUNCH",
  mealTimeName: "午餐",
  menuEndTime: "14:00:00",
  menuSites: [
    {
      boxMealItems: [
        {
          additionalInfo: null,
          description: null,
          foodName: "烧椒虾滑拌面",
          kindCode: "KIND_SET_MEAL",
          kindName: "套餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍱套餐1",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "回锅肉拌面",
          kindCode: "KIND_SET_MEAL",
          kindName: "套餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍱套餐2",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "藤椒鸡块面",
          kindCode: "KIND_SET_MEAL",
          kindName: "套餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍱套餐3",
        },
      ],
      selfServiceItems: [],
      siteId: 502,
      siteLabel: "B1 面食之旅【面】",
    },
    {
      boxMealItems: [
        {
          additionalInfo: null,
          description: null,
          foodName: "青花椒鱼片",
          kindCode: "KIND_SET_MEAL",
          kindName: "套餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍱套餐1",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "石板豆腐",
          kindCode: "KIND_SET_MEAL",
          kindName: "套餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍱套餐2",
        },
      ],
      selfServiceItems: [],
      siteId: 503,
      siteLabel: "B1 匠鱼先生【鱼】",
    },
    {
      boxMealItems: [
        {
          additionalInfo: null,
          description: null,
          foodName: "菜莽+酱棒骨+菌菇牛肉汤",
          kindCode: "KIND_SET_MEAL",
          kindName: "套餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍱套餐1",
        },
      ],
      selfServiceItems: [],
      siteId: 504,
      siteLabel: "B1 食咗饭味【粤】",
    },
    {
      boxMealItems: [
        {
          additionalInfo: null,
          description: null,
          foodName: "湘西炒肚条",
          kindCode: "KIND_SET_MEAL",
          kindName: "套餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍱套餐1",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "鲜虾炒仔鸡",
          kindCode: "KIND_SET_MEAL",
          kindName: "套餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍱套餐2",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "肉丁烧茄子",
          kindCode: "KIND_SET_MEAL",
          kindName: "套餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍱套餐3",
        },
      ],
      selfServiceItems: [],
      siteId: 505,
      siteLabel: "B1 壹口良食【川湘】",
    },
    {
      boxMealItems: [
        {
          additionalInfo: null,
          description: null,
          foodName: "油麻卤鸭饭",
          kindCode: "KIND_SET_MEAL",
          kindName: "套餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍱套餐1",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "鱼酸菜炖棒骨",
          kindCode: "KIND_SET_MEAL",
          kindName: "套餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍱套餐2",
        },
      ],
      selfServiceItems: [],
      siteId: 506,
      siteLabel: "B1 开卤鲜锋【卤货】",
    },
    {
      boxMealItems: [
        {
          additionalInfo: null,
          description: null,
          foodName: "泰皇咖喱鸡排虾",
          kindCode: "KIND_SET_MEAL",
          kindName: "套餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍱套餐1",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "腊肠仔排煲仔饭",
          kindCode: "KIND_SET_MEAL",
          kindName: "套餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍱套餐2",
        },
      ],
      selfServiceItems: [],
      siteId: 507,
      siteLabel: "B1 朝花西食【日韩】",
    },
    {
      boxMealItems: [
        {
          additionalInfo: null,
          description: null,
          foodName: "煎烤嫩牛肉+酒酿元宵",
          kindCode: "KIND_SET_MEAL",
          kindName: "套餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍱套餐1",
        },
      ],
      selfServiceItems: [],
      siteId: 508,
      siteLabel: "B1 囍焰 【铁板】",
    },
    {
      boxMealItems: [
        {
          additionalInfo: null,
          description: null,
          foodName: "牛肉大葱馄饨",
          kindCode: "KIND_SET_MEAL",
          kindName: "套餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍱套餐1",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "猪肉酸菜水饺",
          kindCode: "KIND_SET_MEAL",
          kindName: "套餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍱套餐2",
        },
      ],
      selfServiceItems: [],
      siteId: 509,
      siteLabel: "B1 铁子开饭【水饺】",
    },
    {
      boxMealItems: [
        {
          additionalInfo: null,
          description: null,
          foodName: "香辣筋头巴脑锅",
          kindCode: "KIND_SET_MEAL",
          kindName: "套餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍱套餐1",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "藤椒鸡肉锅",
          kindCode: "KIND_SET_MEAL",
          kindName: "套餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍱套餐2",
        },
      ],
      selfServiceItems: [],
      siteId: 510,
      siteLabel: "B1 虾搞怪【虾滑】",
    },
    {
      boxMealItems: [],
      selfServiceItems: [
        {
          additionalInfo: null,
          description: null,
          foodName: "红焖羊肉",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🐂主荤",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "干锅猪舌",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🐂主荤",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "双椒猪肉粒",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍡半荤",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "酱爆鸡丁",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍡半荤",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "干锅香辣肉片",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍡半荤",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "蒜蓉娃娃菜",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥒素菜",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "圆葱炒鸡蛋",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥒素菜",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "清炒芥兰",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥒素菜",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "凉拌冷面",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥟风味小吃",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "葱香馒头",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍜面食",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "红糖饼",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍜面食",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "白米饭",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍚主食",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "红枣米饭",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍚主食",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "蒸芋头",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍠杂粮",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "紫米粥",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥣流食",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "西红柿鸡蛋汤",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥣流食",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "纯粹花茶",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥛饮品",
        },
      ],
      siteId: 512,
      siteLabel: "B1 川湘餐线【自助】",
    },
    {
      boxMealItems: [],
      selfServiceItems: [
        {
          additionalInfo: null,
          description: null,
          foodName: "蒙古烤肉",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🐂主荤",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "爆炒三黄鸡",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🐂主荤",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "醋溜木须肉",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍡半荤",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "青瓜虾仁",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍡半荤",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "红烧肉焖豆腐",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍡半荤",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "蒜蓉娃娃菜",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥒素菜",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "圆葱炒鸡蛋",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥒素菜",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "清炒芥兰",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥒素菜",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "凉拌冷面",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥟风味小吃",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "葱香馒头",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍜面食",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "红糖饼",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍜面食",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "白米饭",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍚主食",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "红枣米饭",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍚主食",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "蒸芋头",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍠杂粮",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "紫米粥",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥣流食",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "西红柿鸡蛋汤",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥣流食",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "纯粹花茶",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥛饮品",
        },
      ],
      siteId: 514,
      siteLabel: "B1 京鲁餐线【自助】",
    },
    {
      boxMealItems: [],
      selfServiceItems: [
        {
          additionalInfo: null,
          description: null,
          foodName: "蒜子烧鱼块",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🐂主荤",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "糖醋排骨",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🐂主荤",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "养生小炒",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍡半荤",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "茭白炒肉",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍡半荤",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "鱼香鸡丝",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍡半荤",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "蒜蓉娃娃菜",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥒素菜",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "圆葱炒鸡蛋",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥒素菜",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "清炒芥兰",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥒素菜",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "凉拌冷面",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥟风味小吃",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "葱香馒头",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍜面食",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "红糖饼",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍜面食",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "白米饭",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍚主食",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "红枣米饭",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍚主食",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "蒸芋头",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍠杂粮",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "紫米粥",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥣流食",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "西红柿鸡蛋汤",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥣流食",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "纯粹花茶",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥛饮品",
        },
      ],
      siteId: 516,
      siteLabel: "B1 淮扬餐线【自助】",
    },
    {
      boxMealItems: [
        {
          additionalInfo: null,
          description: "",
          foodName: "烤冷面+烤羊肉串2串",
          kindCode: "KIND_SET_MEAL",
          kindName: "套餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍱套餐1",
        },
      ],
      selfServiceItems: [],
      siteId: 517,
      siteLabel: "B1 亚克西烤肉【烤肉】",
    },
    {
      boxMealItems: [
        {
          additionalInfo: null,
          description: "",
          foodName: "牛肉臊子面+烤羊肉串2串",
          kindCode: "KIND_SET_MEAL",
          kindName: "套餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍱套餐1",
        },
        {
          additionalInfo: null,
          description: "",
          foodName: "西红柿鸡蛋拌面+烤羊肉串2串",
          kindCode: "KIND_SET_MEAL",
          kindName: "套餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍱套餐2",
        },
        {
          additionalInfo: null,
          description: "",
          foodName: "剁椒牛肉拌面+烤羊肉串2串",
          kindCode: "KIND_SET_MEAL",
          kindName: "套餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍱套餐3",
        },
        {
          additionalInfo: null,
          description: "",
          foodName: "椒麻鸡拌面+烤羊肉串2串",
          kindCode: "KIND_SET_MEAL",
          kindName: "套餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍱套餐4",
        },
        {
          additionalInfo: null,
          description: "",
          foodName: "酸汤水饺",
          kindCode: "KIND_SET_MEAL",
          kindName: "套餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍱套餐5",
        },
      ],
      selfServiceItems: [],
      siteId: 518,
      siteLabel: "B1 新疆拌面【拌面】",
    },
    {
      boxMealItems: [
        {
          additionalInfo: null,
          description: "",
          foodName: "牛肉拉面+烤羊肉串2串",
          kindCode: "KIND_SET_MEAL",
          kindName: "套餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍱套餐1",
        },
      ],
      selfServiceItems: [],
      siteId: 520,
      siteLabel: "B1 禧好牛肉面【拉面】",
    },
    {
      boxMealItems: [
        {
          additionalInfo: null,
          description: "",
          foodName: "麻酱牛肚粉",
          kindCode: "KIND_SET_MEAL",
          kindName: "套餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍱套餐1",
        },
      ],
      selfServiceItems: [],
      siteId: 523,
      siteLabel: "B1 九碗三行子【新疆大碗菜】",
    },
    {
      boxMealItems: [],
      selfServiceItems: [
        {
          additionalInfo: null,
          description: "",
          foodName: "香酥羊排",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🐂主荤",
        },
        {
          additionalInfo: null,
          description: "",
          foodName: "家乡炖鱼",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🐂主荤",
        },
        {
          additionalInfo: null,
          description: "",
          foodName: "蛋羹肉丝",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍡半荤",
        },
        {
          additionalInfo: null,
          description: "",
          foodName: "西葫芦炒肉片",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍡半荤",
        },
        {
          additionalInfo: null,
          description: "",
          foodName: "芋头烧鸡块",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍡半荤",
        },
        {
          additionalInfo: null,
          description: "",
          foodName: "尖椒豆皮",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥒素菜",
        },
        {
          additionalInfo: null,
          description: "",
          foodName: "洋葱炒鸡蛋",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥒素菜",
        },
        {
          additionalInfo: null,
          description: "",
          foodName: "蒜蓉油菜",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥒素菜",
        },
        {
          additionalInfo: null,
          description: "",
          foodName: "烤包子",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥟风味小吃",
        },
        {
          additionalInfo: null,
          description: "",
          foodName: "馒头",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍜面食",
        },
        {
          additionalInfo: null,
          description: "",
          foodName: "红糖发糕",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍜面食",
        },
        {
          additionalInfo: null,
          description: "",
          foodName: "白米饭",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍚主食",
        },
        {
          additionalInfo: null,
          description: "",
          foodName: "红豆米饭",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍠杂粮",
        },
        {
          additionalInfo: null,
          description: "",
          foodName: "烤红薯",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍠杂粮",
        },
        {
          additionalInfo: null,
          description: "",
          foodName: "银耳红枣汤",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥣流食",
        },
        {
          additionalInfo: null,
          description: "",
          foodName: "玉米面粥",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥣流食",
        },
        {
          additionalInfo: null,
          description: "",
          foodName: "无糖高山乌龙茶",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥛饮品",
        },
      ],
      siteId: 524,
      siteLabel: "B1 九碗十三花【清真自助】",
    },
    {
      boxMealItems: [
        {
          additionalInfo: null,
          description: null,
          foodName: "烧椒铁板肥牛",
          kindCode: "KIND_SET_MEAL",
          kindName: "套餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍱套餐1",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "黄焖鸡",
          kindCode: "KIND_SET_MEAL",
          kindName: "套餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍱套餐2",
        },
      ],
      selfServiceItems: [],
      siteId: 847,
      siteLabel: "B1 饭饱饱当家【融合菜】",
    },
    {
      boxMealItems: [
        {
          additionalInfo: null,
          description: null,
          foodName: "浓汤排骨米线",
          kindCode: "KIND_SET_MEAL",
          kindName: "套餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍱套餐1",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "宫爆鸡丁盖饭+口蘑牛肉汤",
          kindCode: "KIND_SET_MEAL",
          kindName: "套餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍱套餐2",
        },
      ],
      selfServiceItems: [],
      siteId: 918,
      siteLabel: "B1 沙县小吃",
    },
    {
      boxMealItems: [],
      selfServiceItems: [
        {
          additionalInfo: null,
          description: null,
          foodName: "锅包肉",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🐂主荤",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "小鸡炖蘑菇",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🐂主荤",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "泡椒鸭胗",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍡半荤",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "养生小炒",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍡半荤",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "浓汤酥肉",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍡半荤",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "家常土豆丝",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥒素菜",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "蒜蓉油菜",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥒素菜",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "凉拌冷面",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥟风味小吃",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "葱香馒头",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍜面食",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "红糖饼",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍜面食",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "白米饭",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍚主食",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "红枣米饭",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍚主食",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "蒸芋头",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍠杂粮",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "紫米粥",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥣流食",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "西红柿鸡蛋汤",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥣流食",
        },
        {
          additionalInfo: null,
          description: null,
          foodName: "纯粹花茶",
          kindCode: "KIND_SELF_SERVICE",
          kindName: "自助餐",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🥛饮品",
        },
      ],
      siteId: 1207,
      siteLabel: "B1 辽小伙大排挡【自助】",
    },
    {
      boxMealItems: [
        {
          additionalInfo: null,
          description: null,
          foodName: "蛋挞",
          kindCode: "KIND_AFTERNOON_TEA",
          kindName: "15:00-16:00",
          sku: null,
          tags: {
            allergies: [],
            dietaryPreferences: [],
            religiousTags: [],
          },
          typeName: "🍰烘焙",
        },
      ],
      selfServiceItems: [],
      siteId: 1255,
      siteLabel: "下午茶",
    },
  ],
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
  const sitesPerRow = isMuslim ? 1 : 4;
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
    return <div>{menu.hidingReason}</div>;
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
