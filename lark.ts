import * as Lark from "@larksuiteoapi/node-sdk";
import { Readable } from "node:stream";
import {
  parseMealTime,
  fetchMenu,
  renderMenuImage,
  getSessionId,
} from "./server";
import type { ReadStream } from "node:fs";

const baseConfig = {
  appId: "cli_a8897533bd3b500b",
  appSecret: "gpu8NLUOEUztxzBO1vLGhcjD75chYG7q",
};
const client = new Lark.Client(baseConfig);
const wsClient = new Lark.WSClient({
  ...baseConfig,
  loggerLevel: Lark.LoggerLevel.debug,
});
wsClient.start({
  // 处理「接收消息」事件，事件类型为 im.message.receive_v1
  eventDispatcher: new Lark.EventDispatcher({}).register({
    "im.message.receive_v1": async (data) => {
      const {
        message: { chat_id, content },
      } = data;
      const { text } = JSON.parse(content);
      if (typeof text !== "string") {
        console.error("Invalid message content");
        return;
      }
      try {
        const menuTime = parseMealTime(text.replace(/\s/g, ""));
        const menuData = await fetchMenu(getSessionId()!, menuTime);
        const image = await renderMenuImage(menuData);
        const uploadResp = await client.im.image.create({
          data: {
            image_type: "message",
            image: Readable.from(image) as ReadStream,
          },
        });
        if (!uploadResp) {
          throw new Error("Image upload failed");
        }
        // 示例操作：接收消息后，调用「发送消息」API 进行消息回复。
        await client.im.v1.message.create({
          params: {
            receive_id_type: "chat_id",
          },
          data: {
            receive_id: chat_id,
            content: JSON.stringify({
              config: {
                wide_screen_mode: true,
              },
              elements: [
                {
                  alt: {
                    content: "",
                    tag: "plain_text",
                  },
                  img_key: uploadResp.image_key,
                  tag: "img",
                },
              ],
              header: {
                template: "turquoise",
                title: {
                  content: `字节餐厅 ${menuData.date} ${menuData.mealTimeName}菜单`,
                  tag: "plain_text",
                },
              },
            }),
            msg_type: "interactive",
          },
        });
      } catch (error) {
        console.error("Error processing message:", error);
        await client.im.v1.message.create({
          params: {
            receive_id_type: "chat_id",
          },
          data: {
            receive_id: chat_id,
            content: JSON.stringify({
              text: `错误： ${error?.message ?? "未知错误"}`,
            }),
            msg_type: "text",
          },
        });
      }
    },
  }),
});
