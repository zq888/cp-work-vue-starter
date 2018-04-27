/**
 * CopyRight: Xing wenju
 * Author: Xing wenju
 * Email: linuxing3@qq.com
 * Git: https://github.org/linuxing3
 * License: MIT
 * Project:  cp-work-vue-template
 * Language: javascript/vue
 * Description:  Description is here
 *
 * 本模块实现了firebase JavaScript SDK的部分功能
 *
 * @providesModule firebaseSDK
 */

import firebase from "firebase";

interface fbUpdates {
  [index: string]: any;
}

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDS_pnYl8I9oHJ1DCqiuqkwFJm3WymI4bg",
  authDomain: "cp-work.firebaseapp.com",
  databaseURL: "https://cp-work.firebaseio.com",
  projectId: "cp-work",
  storageBucket: "cp-work.appspot.com",
  messagingSenderId: "714772306330"
};

// var config = {
//   apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
//   authDomain: process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
//   databaseURL: process.env.VUE_APP_FIREBASE_DATABASEURL,
//   projectId: process.env.VUE_APP_FIREBASE_PROJECTID,
//   storageBucket: process.env.VUE_APP_FIREBASE_STORAGEBUCKET,
//   messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGINGSENDERID,
// };

export class clsFirebase {
  private config: object;
  public firebaseAuth: any;
  public firebaseDb: any;
  public FacebookProvider: any;
  constructor() {
    this.config = config;
  }

  init() {
    firebase.initializeApp(this.config);
    this.firebaseAuth = firebase.auth();
    this.firebaseDb = firebase.database();
    this.FacebookProvider = new firebase.auth.FacebookAuthProvider();
  }

  async loginWithEmail(email: string, password: string) {
    let e = email || "xingwenju@gmail.com";
    let p = password || "tswc0916";
    let user = await firebaseAuth.signInWithEmailAndPassword(e, p);
    return new Promise((resolve, _) => {
      console.log("Logged in as " + user.email);
      resolve(user);
    });
  }
}

console.log(config);
firebase.initializeApp(config);

/*
 * 初始化认证和数据库对象
 */

export const firebaseAuth = firebase.auth();
export const firebaseDb = firebase.database();
export const FacebookProvider = new firebase.auth.FacebookAuthProvider();
// export const storage = firebase.storage();

export async function loginWithEmail(email: string, password: string) {
  let e = email || "xingwenju@gmail.com";
  let p = password || "tswc0916";
  let user = await firebaseAuth.signInWithEmailAndPassword(e, p);
  console.log("Logged in as " + user.email);
  return user;
}

export async function logonWithEmail(email: string, password: string) {
  let e = email || "xingwenju@gmail.com";
  let p = password || "tswc0916";
  let user = await firebaseAuth.createUserWithEmailAndPassword(e, p);
  return new Promise((resolve, reject) => {
    resolve(user);
  });
}
/*
 * Methods exported as API
 * set()	将数据写入或替换到定义的路径。
 * push()	添加到数据列表。Firebase 均会生成唯一ID
 * update()	更新定义的路径中的部分键，而不替换所有数据。
 * transaction()	更新可能因并发更新而损坏的复杂数据。
 * orderByChild()	按指定子键的值对结果排序。
 * orderByKey()	按子键对结果排序。
 * orderByValue()	按子值对结果排序。
 * limitToFirst()	设置要从排序结果列表开头返回的最大项目数。
 * limitToLast()	设置要从排序结果列表结尾返回的最大项目数。
 * startAt()	返回大于或等于指定键、值或优先级的项目，具体取决于所选的排序依据方法。
 * endAt()	返回小于或等于指定键、值或优先级的项目，具体取决于所选的排序依据方法。
 * equalTo()	返回等于指定键、值或优先级的项目，具体取决于所选的排序依据方法。
 * onDisconnect().remove()
 * on('value',()=>)
 */

/*
 * create a new key
 * create a new value
 */
export async function setDataInTable(firebaseDb: any, table: any, data: any) {
  // data = {...props}
  // data = {name: ,age: }
  console.log(data);
  let key = await firebaseDb
    .ref()
    .child(table)
    .push().key;
  data["uniKey"] = key;
  let snapshot = await firebaseDb.ref(table + "/" + key).set(data);
  return new Promise((resolve, reject) => {
    resolve(snapshot);
  });
}

/*
 * find the key
 * update the key with new value
 */
export function updateDataInTable(firebaseDb: any, table: any, data: any) {
  // data = {id:, name:, age:,}
  // read will return {key: 12345, value: {name:, age:,}
  let updates: fbUpdates = {};
  updates[table + "/" + data.uniKey] = data;
  firebaseDb.ref().update(updates);
}

/*
 * find the key
 * remove value
 */
export function deleteDataInTable(firebaseDb: any, table: any, key: any) {
  firebaseDb.ref(table + "/" + key).remove();
}

/*
 * async function, callback must be info
 */
export async function readDataInTable(firebaseDb: any, table: any, key: any) {
  // using key to read will keep consistency of set and update
  // return {key: 12345, value: {name:, age:,}
  let snapshot = await firebaseDb.ref(table + "/" + key).once("value");
  return new Promise((resolve, reject) => {
    resolve(snapshot);
  });
}
/*
 * async function
 */
export async function readTable(firebaseDb: any, table: any) {
  // using key to read will keep consistency of set and update
  // return {key: 12345, value: {name:, age:,}
  let snapshot = await firebaseDb.ref(table).once("value");
  return snapshot;
}

export async function monitorWholeTable(firebaseDb: any, table: any) {
  let tableRef = firebaseDb
    .ref(table)
    .tableRef.on("value", function(snap: any) {
      return snap.val();
    });
}

export function monitorTable(firebaseDb: any, table: any) {
  let tableRef = firebaseDb.ref(table);
  tableRef.on("child_added", function(data: any) {
    //return data.key;
    return data;
  });
  tableRef.on("child_changed", function(data: any) {
    //return data.key;
    return data;
  });
  tableRef.on("child_removed", function(data: any) {
    return data;
  });
}
