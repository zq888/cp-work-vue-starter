import { log } from "@/util";

import * as types from "@/store/types";

export const FirebasePlugin = (options: any) => {
  return (store: any) => {
    let namespace = options.namespace || "";
    store.dispatch(`${namespace}/${types.mRead}`, { name: "xing" });
    store.subscribe((mutations: any) => {
      log.suc("Plugin enabled!");
    });
  };
};