import { log } from "@/util";

import * as types from "@/store/types";

import { collections } from "@/store/Model/BaseModel";

import {
  firebaseDb,
  loginWithEmail,
  logonWithEmail,
  setDataInTable,
  updateDataInTable,
  deleteDataInTable,
  readDataInTable,
  readTable,
  monitorWholeTable
} from "@/store/api/firebaseSDK";

export const FirebasePlugin = (options: any = {}) => {
  return (store: any) => {
    const namespace = options.namespace || "";
    store.subscribe((mutation: any, state: any) => {
      log.suc(mutation.type);
      let cleanPayload = mutation.payload;
      if (mutation.type === `${namespace}/${types.mCreate}`) {
        log.info(`Creating ${namespace} with plugin...!`);
        setDataInTable(firebaseDb, namespace, cleanPayload);
      }
      if (mutation.type === `${namespace}/${types.mDelete}`) {
        log.info(`Deleting ${namespace} with plugin...!`);
        deleteDataInTable(firebaseDb, namespace, cleanPayload._uniKey);
      }
      if (mutation.type === `${namespace}/${types.mUpdate}`) {
        log.info(`Updating ${namespace} with plugin...!`);
        updateDataInTable(firebaseDb, namespace, cleanPayload._uniKey);
      }
      if (mutation.type === `${namespace}/${types.mRead}`) {
        log.info(`Finding ${namespace} with plugin...!`);
        readTable(firebaseDb, namespace);
      }
    });
  };
};

export const PersistencePlugin = (options: any) => {
  return (store: any) => {
    let namespace = options.namespace || "";
    // Read data from Nedb
    store.dispatch(`${namespace}/${types.aRead}`, {});
    store.subscribe((mutations: any) => {
      log.suc("Persistence Plugin enabled!");
    });
  };
};
