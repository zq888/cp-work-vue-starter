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

interface fbUpdates {
  [index: string]: any;
}

interface IFireDatabase extends firebase.database.Database {}
interface IFireDatabaseRef extends firebase.database.Reference {}
interface IFirebaseAuth extends firebase.auth.Auth {}
interface IFacebookProvider extends firebase.auth.FacebookAuthProvider {}

/**
 * CPWork.IDatabasePool as type
 * Database pool in format { "user": Database }
 * @interface INedbDatabasePool
 */
export interface IFireDatabasePool extends CPWork.IDatabasePool {
  [index: string]: IFireDatabaseRef;
}

export interface IVuexFirebaseAdaptor extends CPWork.IVuexAdaptor {
  userPath: string;
  pool: IFireDatabasePool;
  collections: string[];
  current: string;
  dbInit(): any;
  dbCreate(collection: string): any;
  dbRemove(collection: string): any;
  dbOpen(collection: string): any;
  dbSetCurrent(collection: string): any;
  findItem(db: IFireDatabase, query: any, table: string): any;
  addItem(db: IFireDatabase, cleanPayload: any, table: string): any;
  updateItem(
    db: IFireDatabase,
    query: any,
    cleanPayload: any,
    table: string
  ): any;
  removeItem(db: IFireDatabase, query: any, table: string): any;
}

/////////////////////////////////////////////////////////////////////////

export class clsFirebase implements IVuexFirebaseAdaptor {
  userPath: string;
  pool: IFireDatabasePool;
  collections: string[];
  current: string;

  private config: object;

  firebaseAuth: firebase.auth.Auth;
  firebaseDb: IFireDatabase;
  FacebookProvider: firebase.auth.FacebookAuthProvider;

  constructor(userPath: string, collections: string[], config: object) {
    this.config = config;
    this.collections = collections;
    this.userPath = userPath;
    this.pool = {};
    this.dbInit();
  }

  dbInit() {
    // 初始化应用
    firebase.initializeApp(this.config);
    // 初始化验证+数据库
    this.firebaseAuth = firebase.auth();
    this.firebaseDb = firebase.database();
    this.FacebookProvider = new firebase.auth.FacebookAuthProvider();
  }

  dbCreate(collection: string) {
    this.pool[collection] = this.firebaseDb.ref(collection);
  }

  dbRemove(collection: string): any {}

  dbOpen(collection: string): IFireDatabaseRef {
    return this.pool[collection];
  }

  dbSetCurrent(collection: string): any {
    this.current = collection || "db";
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

  async addItem(db: IFireDatabase, cleanPayload: any, table: string) {
    // data = {...props}
    // data = {name: ,age: }
    console.log(cleanPayload);
    let key = await db
      .ref()
      .child(table)
      .push().key;
    cleanPayload["uniKey"] = key;
    let snapshot = await db.ref(table + "/" + key).set(cleanPayload);
    return new Promise((resolve, reject) => {
      resolve(snapshot);
    });
  }

  /*
   * find the key
   * update the key with new value
   */
  async updateItem(db: IFireDatabase, cleanPayload: any, table: string) {
    // data = {id:, name:, age:,}
    // read will return {key: 12345, value: {name:, age:,}
    let updates: fbUpdates = {};
    updates[table + "/" + cleanPayload.uniKey] = cleanPayload;
    let snapshot = await db.ref().update(updates);
    return new Promise((resolve, reject) => {
      resolve(snapshot);
    });
  }

  /*
   * find the key
   * remove value
   */
  async removeItem(db: IFireDatabase, query: any, table: string) {
    if (query !== undefined) table = table + "/" + query.uniKey;
    let snapshot = await firebaseDb.ref(table + "/" + query.uniKey).remove();
    return new Promise((resolve, reject) => {
      resolve(snapshot);
    });
  }

  /*
   * async function
   */
  async findItem(db: IFireDatabase, query: any, table: string) {
    // using key to read will keep consistency of set and update
    // return {key: 12345, value: {name:, age:,}
    if (query !== undefined) table = table + "/" + query.uniKey;
    let snapshot = await db.ref(table).once("value");
    return new Promise((resolve, reject) => {
      resolve(snapshot);
    });
  }
}

/*
* 初始化认证和数据库对象
*/

// console.log(config);
firebase.initializeApp(config);

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
/**
 * Firebase Methods exported as API
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
export async function setDataInTable(
  firebaseDb: IFireDatabase,
  table: string,
  data: any
) {
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
export async function updateDataInTable(
  firebaseDb: any,
  table: any,
  data: any
) {
  // data = {id:, name:, age:,}
  // read will return {key: 12345, value: {name:, age:,}
  let updates: fbUpdates = {};
  updates[table + "/" + data.uniKey] = data;
  let snapshot = await firebaseDb.ref().update(updates);
  return new Promise((resolve, reject) => {
    resolve(snapshot);
  });
}

/*
 * find the key
 * remove value
 */
export async function deleteDataInTable(
  firebaseDb: IFireDatabase,
  table: string,
  key: any
) {
  let snapshot = await firebaseDb.ref(table + "/" + key).remove();
  return new Promise((resolve, reject) => {
    resolve(snapshot);
  });
}

/*
 * async function, callback must be info
 */
export async function readDataInTable(
  firebaseDb: IFireDatabase,
  table: string,
  key: any
) {
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
export async function readTable(firebaseDb: IFireDatabase, table: string) {
  // using key to read will keep consistency of set and update
  // return {key: 12345, value: {name:, age:,}
  let snapshot = await firebaseDb.ref(table).once("value");
  return new Promise((resolve, reject) => {
    resolve(snapshot);
  });
}

export async function monitorWholeTable(
  firebaseDb: IFireDatabase,
  table: string
) {
  let tableRef = await firebaseDb.ref(table).on("value", () => {}, null, null);
  return new Promise((resolve, reject) => {
    resolve(tableRef);
  });
}

export async function monitorTable(firebaseDb: IFireDatabase, table: string) {
  let addedData = await firebaseDb
    .ref(table)
    .on("child_added", () => {}, null, null);

  let changedData = await firebaseDb
    .ref(table)
    .on("child_changed", () => {}, null, null);

  let removedData = await firebaseDb
    .ref(table)
    .on("child_removed", () => {}, null, null);

  return new Promise((resolve, reject) => {
    resolve({
      addedData,
      changedData,
      removedData
    });
  });
}
