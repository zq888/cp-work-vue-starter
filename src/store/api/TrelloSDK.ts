/**
 * CopyRight: Xing wenju
 * Author: Xing wenju
 * Email: linuxing3@qq.com
 * Git: https://github.org/linuxing3
 * License: MIT
 * Project:  cp-work-vue-starter
 * Language: javascript/vue
 * Description:  Description is here
 *
 * 本模块实现了nedb JavaScript SDK的部分功能
 *
 * @providesModule trelloSDK
 */

import path from "path";
import fs from "fs";
import { log } from "@/util";

import Trello from "trello";
// var Trello = require("trello");

const TRELLO_APP = "5c26716e68d271b39046eb96a2e11d56";
const TRELLO_TOKEN = "1eca9da57ea56a29695639f5e64499a247e5ac9822357d0ff06b97a301f72de7";

const trelloClient = new Trello(TRELLO_APP, TRELLO_TOKEN);

const first_ListId = "555c8e8438613a1b6f665efc";
const second_ListId = "55cce7e390e2b8ad5bc65a3c";
const myMemberId = "xingwenju";

class clsTrello {
  client: any;
  memberId: string = "xingwenju";
  boards: any[] = [];

  constructor() {
    this.client = new Trello(TRELLO_APP, TRELLO_TOKEN);
  }

  async getBoards() {
    let { error, result } = await this.client.getBoards(this.memberId);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  }
}

export default clsTrello;
