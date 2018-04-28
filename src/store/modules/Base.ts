import * as types from "@/store/types";

import { Store, Dispatch, Commit, ActionContext } from "vuex";

import { ObjectKeysToArray, baseFilter } from "@/util";

import {
  dbCreate,
  dbInit,
  dbOpen,
  dbRemove,
  addItem,
  findItem,
  updateItem,
  removeItem
} from "@/store/api/Nedb";

/**
 * Dispatch辅助函数，带有类型智能提示
 * @param ctx ActionContext
 * @param actionType string
 * @param payload  object| object[]
 */
const CPDispatch = (
  ctx: ActionContext<CPWork.IBaseState, any>,
  actionType: string,
  payload: object | object[]
) => {
  return ctx.dispatch(actionType, payload);
};

/**
 * Commit辅助函数，带有类型智能提示
 * @param ctx ActionContext
 * @param actionType string
 * @param payload  object| object[]
 */
const CPCommit = (
  ctx: ActionContext<CPWork.IBaseState, any>,
  actionType: string,
  payload: object | object[]
) => {
  return ctx.commit(actionType, payload);
};

const getters = {
  moduleName: (state: CPWork.IBaseState) => state.name,
  itemCounts: (state: CPWork.IBaseState) => state.items.length,
  itemKeys: (state: CPWork.IBaseState) => {
    return ObjectKeysToArray(state.activeItem);
  },
  itemFiltered: (state: CPWork.IBaseState) => {
    return baseFilter(state.items, state.sortKey, state.filterKey);
  }
};

const mutations = {
  [types.mCreate]: (state: CPWork.IBaseState, payload: any) => {
    state.items.push(payload);
  },
  [types.mDelete]: (state: CPWork.IBaseState, payload: any) => {
    state.items = state.items.filter((item: any) => item._id !== payload._id);
  },
  [types.mUpdate]: (state: CPWork.IBaseState, payload: any) => {
    let item = state.items.filter((item: any) => item._id === payload._id);
    item = payload;
  },
  [types.mRead]: (state: CPWork.IBaseState, payload: any) => {
    state.items = payload;
  },
  [types.mSetValue]: (state: CPWork.IBaseState, payload: any) => {
    state.activeItem[payload.target.name] = payload.target.value;
  },
  [types.mSetFilter]: (state: CPWork.IBaseState, payload: any) => {
    state.filterKey = payload.target.value;
  },
  [types.mSetActive]: (state: any, payload: any) => {
    state.activeItem = payload;
  },
  [types.mDbCreate]: (state: any, payload: any) => {
    dbCreate(payload);
  },
  [types.mDbDelete]: (state: any, payload: any) => {
    dbRemove(payload);
  }
};

const actions = {
  [types.aCreate]: async (
    ctx: ActionContext<CPWork.IBaseState, any>,
    payload: any
  ) => {
    // 不使用辅助函数，先本地存储，再提交
    let newDoc = await addItem(dbOpen(ctx.state.name), payload);
    ctx.commit(types.mCreate, newDoc);
  },
  [types.aDelete]: async (
    ctx: ActionContext<CPWork.IBaseState, any>,
    payload: any
  ) => {
    // 不使用辅助函数，先本地存储，再提交
    let n = await removeItem(dbOpen(ctx.state.name), {
      _id: payload._id
    });
    if (n !== null) ctx.commit(types.mDelete, payload);
  },
  [types.aUpdate]: async (
    ctx: ActionContext<CPWork.IBaseState, any>,
    payload: any
  ) => {
    // 不使用辅助函数，先本地存储，再提交
    let { _id, ...cleanPayload } = payload;
    let query = {
      _id: payload._id
    };
    let n = await updateItem(dbOpen(ctx.state.name), query, cleanPayload);
    if (n !== null) ctx.commit(types.mUpdate, payload);
  },
  [types.aRead]: async (
    ctx: ActionContext<CPWork.IBaseState, any>,
    payload: any
  ) => {
    // 不使用辅助函数，先本地存储，再提交
    let docs = await findItem(dbOpen(ctx.state.name), {});
    ctx.commit(types.mRead, docs);
  },
  [types.aReadOne]: async (
    ctx: ActionContext<CPWork.IBaseState, any>,
    payload: any
  ) => {
    // 使用辅助函数，先本地存储，再提交
    let docs = await findItem(dbOpen(ctx.state.name), {});
    if (docs !== undefined) {
      CPCommit(ctx, types.mReadOne, docs);
    }
  }
};

export default {
  getters,
  actions,
  mutations
};
