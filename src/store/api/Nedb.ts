/*!
 * Vue.js v2.2.6
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
import path from "path";
import fs from "fs";
import Datastore from "nedb";
import { collections, IDatabasePool } from "@/store/Model/BaseModel";
import { log } from "@/util";

let userPath = "";

// Database pool in format [user -> user.db]
let pool: any = {};

// Database persistence Module
export function dbInit() {
    for (let collection of collections) {
        pool[collection] = new Datastore({
            autoload: true,
            filename: path.join(userPath, `${collection}`),
        });
    }
}

export function dbCreate(collection: string) {
    pool[collection] = new Datastore({
        autoload: true,
        filename: path.join(userPath, `${collection}`),
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

// Database table operation Module
export const findItem = (db: any, query: any) => {
    if (db === undefined || query === undefined) return;
    return new Promise((resolve, reject) => {
        db.find(query, (err: any, docs: any) => {
            if (err !== null) {
                reject(err);
            } else {
                resolve(docs);
            }
        });
    });
};

export const addItem = (db: any, cleanPayload: any) => {
    if (db === undefined || cleanPayload === undefined) return;
    return new Promise((resolve, reject) => {
        db.insert(cleanPayload, (err: any, newDoc: any) => {
            if (err !== null) {
                reject(err);
            } else {
                resolve(newDoc);
            }
        });
    });
};

export const updateItem = async (db: any, query: any, cleanPayload: any) => {
    if (db === undefined || cleanPayload === undefined || query === undefined)
        return;
    return new Promise((resolve, reject) => {
        db.update(query, cleanPayload, {}, (err: any, n: any) => {
            if (err !== null) {
                reject(err);
            } else {
                resolve(n);
            }
        });
    });
};

export const removeItem = async (db: any, query: any) => {
    if (db === undefined || query === undefined) return;
    return new Promise((resolve, reject) => {
        db.remove(query, {}, (err: any, n: any) => {
            if (err !== null) {
                reject(err);
            } else {
                resolve(n);
            }
        });
    });
};
