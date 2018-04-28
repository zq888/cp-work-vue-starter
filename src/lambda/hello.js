import { log } from "@/util";

export function handler(event, context, callback) {
  log.info(event);
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: "Hello, World!" })
  });
}
