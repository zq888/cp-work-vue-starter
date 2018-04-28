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
 * @providesModule nedbSDK
 */

import path from "path";
import fs from "fs";
import Datastore from "nedb";
import { collections, user } from "@/store/Model/BaseModel";
import { log } from "@/util";


/////////////////////////////////////////////////////////////////////////
// Interface
/////////////////////////////////////////////////////////////////////////

/**
 * CPWork.IDatabasePool as type
 * Database pool in format { "user": Database }
 * @interface INedbDatabasePool
 */
export interface INedbDatabasePool extends CPWork.IDatabasePool {
  [index: string]: Datastore;
}

export interface IVuexNedbAdaptor extends CPWork.IVuexAdaptor {
  userPath: string;
  pool: INedbDatabasePool;
  collections: string[];
  current: string;
  dbInit(): any;
  dbCreate(collection: string): any;
  dbRemove(collection: string): any;
  dbOpen(collection: string): any;
  dbSetCurrent(collection: string): any;
  findItem(db: Datastore, query: any): any;
  addItem(db: Datastore, cleanPayload: any): any;
  updateItem(db: Datastore, query: any, cleanPayload: any): any;
  removeItem(db: Datastore, query: any): any;
}

/////////////////////////////////////////////////////////////////////////
// Module 
/////////////////////////////////////////////////////////////////////////

let userPath = "";

let pool: INedbDatabasePool = {};

/**
 * Database persistence Module
 */

export function dbInit() {
  for (let collection of collections) {
    pool[collection] = new Datastore({
      autoload: true,
      filename: path.join(userPath, `${collection}`)
    });
  }
}

export function dbInsertDefault() {
  removeItem(dbOpen("db"), {}).then(n => log.err(n));
  for (let collection of collections) {
    addItem(dbOpen("db"), { name: collection });
  }
}

export function dbCreate(collection: string) {
  pool[collection] = new Datastore({
    autoload: true,
    filename: path.join(userPath, `${collection}`)
  });
}

export function dbRemove(collection: string) {
  // pool.splice(pool.indexOf(collection), 1);
  let filename = path.join(userPath, `${collection}`);
  log.err(filename);
  if (fs.existsSync(filename)) {
    log.err("Removing...");
    fs.rmdirSync(filename);
  }
}

export function dbOpen(collection: string) {
  // assert(collections.indexOf(dbName) > -1, 'collection not exists')
  return pool[collection];
}

/** 
 * Database table operation Module 
 * /

 /**
 * 通过查询语句，获取数据，返回一个Promise<数据[]>
 * @param db Nedb Datastore
 * @param query MongoDB-style query
 */
export const findItem = (db: Datastore, query: any) => {
  if (db === undefined || query === undefined) return;
  return new Promise((resolve, reject) => {
    db.find(query, (err: Error, document: any[]) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve(document);
      }
    });
  });
};

/**
 * 获取Vuex中传递的载荷，如果有就删除Id字段，创建并返回Promise<插入的新数据>
 * @param db Nedb Datastore
 * @param cleanPayload MongoDB-style query
 */
export const addItem = (db: Datastore, cleanPayload: any) => {
  if (db === undefined || cleanPayload === undefined) return;
  return new Promise((resolve, reject) => {
    db.insert(cleanPayload, (err: Error, insertedDoc: any) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve(insertedDoc);
      }
    });
  });
};
/**
 * 获取Vuex中传递的载荷，如果有就删除Id字段，更改并返回Promise<修改数据的数量>
 * @param db Nedb Datastore
 * @param query MongoDB-style query
 * @param cleanPayload MongoDB-style query
 */
export const updateItem = async (
  db: Datastore,
  query: any,
  cleanPayload: any
) => {
  if (db === undefined || cleanPayload === undefined || query === undefined)
    return;
  return new Promise((resolve, reject) => {
    db.update(
      query,
      cleanPayload,
      {},
      (err: Error, numberOfUpdated: number) => {
        if (err !== null) {
          reject(err);
        } else {
          resolve(numberOfUpdated);
        }
      }
    );
  });
};

/**
 * 获取Vuex中传递的载荷，如果有就删除Id字段，删除并返回Promise<删除数据的数量>
 * @param db Nedb Datastore
 * @param query MongoDB-style query
 */
export const removeItem = async (db: Datastore, query: any) => {
  if (db === undefined || query === undefined) return;
  return new Promise((resolve, reject) => {
    db.remove(query, {}, (err: Error, numberOfDeleted: number) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve(numberOfDeleted);
      }
    });
  });
};

/////////////////////////////////////////////////////////////////////////
// Class 
/////////////////////////////////////////////////////////////////////////

/**
 * VuexNedbAdaptor类
 * Vuex使用Nedb作为后台的接口
 */
export default class VuexNedbAdaptor implements IVuexNedbAdaptor {
  userPath: string;
  pool: INedbDatabasePool;
  collections: string[];
  current: string;

  constructor(userPath: string, collections: string[]) {
    this.collections = collections;
    this.userPath = userPath;
    this.pool = {};
    this.current = "";
  }

  dbInit() {
    for (let collection of this.collections) {
      this.dbCreate(collection);
    }
  }

  dbCreate(collection: string) {
    this.pool[collection] = new Datastore({
      autoload: true,
      filename: path.join(userPath, `${collection}`)
    });
  }

  dbRemove(collection: string) {
    // pool.splice(pool.indexOf(collection), 1);
    let filename = path.join(userPath, `${collection}`);
    log.err(filename);
    if (fs.existsSync(filename)) {
      log.err("Removing...");
      fs.rmdirSync(filename);
    }
  }

  dbOpen(collection: string) {
    return this.pool[collection];
  }

  dbSetCurrent(collection: string) {
    this.current = collection || "db";
  }

  /** 
 * Database table operation Module 
 * /

 /**
 * 通过查询语句，获取数据，返回一个Promise<数据[]>
 * @param db Nedb Datastore
 * @param query MongoDB-style query
 */
  findItem = (db: Datastore, query: any) => {
    if (db === undefined || query === undefined) return;
    return new Promise((resolve, reject) => {
      db.find(query, (err: Error, document: any[]) => {
        if (err !== null) {
          reject(err);
        } else {
          resolve(document);
        }
      });
    });
  };

  /**
   * 获取Vuex中传递的载荷，如果有就删除Id字段，创建并返回Promise<插入的新数据>
   * @param db Nedb Datastore
   * @param cleanPayload MongoDB-style query
   */
  addItem = (db: Datastore, cleanPayload: any) => {
    if (db === undefined || cleanPayload === undefined) return;
    return new Promise((resolve, reject) => {
      db.insert(cleanPayload, (err: Error, insertedDoc: any) => {
        if (err !== null) {
          reject(err);
        } else {
          resolve(insertedDoc);
        }
      });
    });
  };
  /**
   * 获取Vuex中传递的载荷，如果有就删除Id字段，更改并返回Promise<修改数据的数量>
   * @param db Nedb Datastore
   * @param query MongoDB-style query
   * @param cleanPayload MongoDB-style query
   */
  updateItem = async (db: Datastore, query: any, cleanPayload: any) => {
    if (db === undefined || cleanPayload === undefined || query === undefined)
      return;
    return new Promise((resolve, reject) => {
      db.update(
        query,
        cleanPayload,
        {},
        (err: Error, numberOfUpdated: number) => {
          if (err !== null) {
            reject(err);
          } else {
            resolve(numberOfUpdated);
          }
        }
      );
    });
  };

  /**
   * 获取Vuex中传递的载荷，如果有就删除Id字段，删除并返回Promise<删除数据的数量>
   * @param db Nedb Datastore
   * @param query MongoDB-style query
   */
  removeItem = async (db: Datastore, query: any) => {
    if (db === undefined || query === undefined) return;
    return new Promise((resolve, reject) => {
      db.remove(query, {}, (err: Error, numberOfDeleted: number) => {
        if (err !== null) {
          reject(err);
        } else {
          resolve(numberOfDeleted);
        }
      });
    });
  };
}
