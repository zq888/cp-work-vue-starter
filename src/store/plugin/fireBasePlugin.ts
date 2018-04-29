import { log } from "@/util";

import * as types from "@/store/types";

import { collections } from "@/store/Model/BaseModel";

import fb from "@/store/api/firebaseSDK";

export const FirebasePlugin = (options: any = {}) => {
  return (store: any) => {
    const namespace = options.namespace || "";
    store.subscribe((mutation: any, state: any) => {
      log.suc("Firebase Plugin enabled!");
      log.err(mutation.type);
      let cleanPayload = mutation.payload;
      if (mutation.type === `${namespace}/${types.mCreate}`) {
        log.suc(`Creating ${namespace} with plugin...!`);
        fb.addItem(fb.firebaseDb, cleanPayload, namespace).catch(snapshot => {
          log.info(snapshot);
        });
      }
      if (mutation.type === `${namespace}/${types.mDelete}`) {
        log.suc(`Deleting ${namespace} with plugin...!`);
        fb
          .removeItem(fb.firebaseDb, cleanPayload, namespace)
          .catch(snapshot => {
            log.info(snapshot);
          });
      }
      if (mutation.type === `${namespace}/${types.mUpdate}`) {
        log.suc(`Updating ${namespace} with plugin...!`);
        fb
          .updateItem(fb.firebaseDb, {}, cleanPayload, namespace)
          .catch(snapshot => {
            log.info(snapshot);
          });
      }
      if (mutation.type === `${namespace}/${types.mRead}`) {
        log.suc(`Finding ${namespace} with plugin...!`);
        fb.findItem(fb.firebaseDb, {}, namespace).catch(snapshot => {
          log.info(snapshot);
        });
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
