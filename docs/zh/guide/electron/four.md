# Vuex

+ `general.js` is the base template of store

```js
export const state = {
  items: [],
  currentItem: {
    _id: 1,
    name: "xing wenju",
  },
  filterKey: "",
  sortKey: "",
  editing: false,
  dbName: "",
};

export const getters = {}
export const mutation = {}
export const actions = {}
```

+ `User.js` is the module which extends the `general.js` with `namespace`

```js
/**
 * 适用于人员对象的存储器
 */

import { state, actions, getters, mutations } from "../template/general";

state.dbName = "user";

export default {
  // 使用命名空间，实现模块化导入
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
```

+ If you prefer the `typescript`, you can use types pattern

```js
const state: State = {
  name: "base",
  items: [],
  activeItem: {},
  filterKey: "",
  sortKey: "",
};

const getters = {
  moduleName: (state: State) => state.name,
  itemCounts: (state: State) => state.items.length,
  itemKeys: (state: State) => {
    return [];
  },
  itemFiltered: (state: State) => {
    return baseFilter(state.items, state.sortKey, state.filterKey);
  },
};

const mutations = {
  "mutation/create": (state: State, payload: any) => {
    state.items.push(payload);
  },
  "mutation/delete": (state: State, payload: any) => {
    state.items.push(payload);
  },
  "mutation/update": (state: State, payload: any) => {
    state.items.push(payload);
  },
  "mutation/read": (state: State, payload: any) => {
    state.items.push(payload);
  },
  "mutation/set": (state: State, payload: any) => {
    state.activeItem[payload.target.name] = payload.target.value;
  },
};

const actions = {
  "action/create": (ctx: ActionContext<State, any>, payload: any) => {
    // async and persistence actions
    ctx.commit("mutation/create", payload);
  },
  "action/delete": (ctx: ActionContext<State, any>, payload: any) => {
    // async and persistence actions
    ctx.commit("mutation/delete", payload);
  },
  "action/update": (ctx: ActionContext<State, any>, payload: any) => {
    // async and persistence actions
    ctx.commit("mutation/update", payload);
  },
  "action/read": (ctx: ActionContext<State, any>, payload: any) => {
    // async and persistence actions
    ctx.commit("mutation/read", payload);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
```

+ If you need `vuex plugin`

In the `store/index.js`, add `plugin`

```js
export default new Vuex.Store({
  modules,
  plugins, // add this line
  ...
});
```

Then define you plugin as a array of functions which take store as parameter

In the `plugins/cloud.js` file, is like this

```js
export const FirebasePlugin = (options = {}) => {
  return store => {
    const namespace = options.namespace || "";
    store.subscribe((mutation, state) => {
       // do your side works like save to firbase
    }
  }
}
```