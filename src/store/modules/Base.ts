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
    removeItem,
} from "@/store/api/Nedb";

const getters = {
    moduleName: (state: CPWork.IBaseState) => state.name,
    itemCounts: (state: CPWork.IBaseState) => state.items.length,
    itemKeys: (state: CPWork.IBaseState) => {
        return ObjectKeysToArray(state.activeItem);
    },
    itemFiltered: (state: CPWork.IBaseState) => {
        return baseFilter(state.items, state.sortKey, state.filterKey);
    },
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
};

const actions = {
    [types.aCreate]: async (ctx: ActionContext<CPWork.IBaseState, any>, payload: any) => {
        // async and persistence actions
        let newDoc = await addItem(dbOpen(ctx.state.name), payload);
        ctx.commit("mutationCreate", newDoc);
    },
    [types.aDelete]: async (ctx: ActionContext<CPWork.IBaseState, any>, payload: any) => {
        // async and persistence actions
        let n = await removeItem(dbOpen(ctx.state.name), {
            _id: payload._id,
        });
        if (n !== null) ctx.commit("mutationDelete", payload);
    },
    [types.mUpdate]: async (ctx: ActionContext<CPWork.IBaseState, any>, payload: any) => {
        // async and persistence actions
        let { _id, ...cleanPayload } = payload;
        let query = {
            _id: payload._id,
        };
        let n = await updateItem(dbOpen(ctx.state.name), query, cleanPayload);
        if (n !== null) ctx.commit("mutationUpdate", payload);
    },
    [types.mRead]: async (ctx: ActionContext<CPWork.IBaseState, any>, payload: any) => {
        // async and persistence actions
        let db = dbOpen(ctx.state.name);
        let docs = await findItem(db, {});
        ctx.commit("mutationRead", docs);
    },
};

export default {
    getters,
    actions,
    mutations,
};
