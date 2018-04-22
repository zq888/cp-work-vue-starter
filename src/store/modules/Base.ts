import * as types from "@/store/types";

import { Store, Dispatch, Commit, ActionContext } from "vuex";

import { baseFilter } from "@/util";

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

import { IBaseState as State } from "@/store/Model/BaseModel";

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
    [types.mCreate]: (state: State, payload: any) => {
        state.items.push(payload);
    },
    [types.mDelete]: (state: State, payload: any) => {
        state.items = state.items.filter((item: any) => item._id !== payload._id);
    },
    [types.mUpdate]: (state: State, payload: any) => {
        let item = state.items.filter((item: any) => item._id === payload._id);
        item = payload;
    },
    [types.mRead]: (state: State, payload: any) => {
        state.items = state.items;
    },
    [types.mSet]: (state: State, payload: any) => {
        state.activeItem[payload.target.name] = payload.target.value;
    },
};

const actions = {
    [types.aCreate]: async (ctx: ActionContext<State, any>, payload: any) => {
        // async and persistence actions
        let newDoc = await addItem(dbOpen(ctx.state.name), payload);
        ctx.commit("mutationCreate", newDoc);
    },
    [types.aDelete]: async (ctx: ActionContext<State, any>, payload: any) => {
        // async and persistence actions
        let n = await removeItem(dbOpen(ctx.state.name), {
            _id: payload._id,
        });
        if (n !== null) ctx.commit("mutationDelete", payload);
    },
    [types.mUpdate]: async (ctx: ActionContext<State, any>, payload: any) => {
        // async and persistence actions
        let { _id, ...cleanPayload } = payload;
        let query = {
            _id: payload._id,
        };
        let n = await updateItem(dbOpen(ctx.state.name), query, cleanPayload);
        if (n !== null) ctx.commit("mutationUpdate", payload);
        ctx.commit("mutationUpdate", payload);
    },
    [types.mRead]: async (ctx: ActionContext<State, any>, payload: any) => {
        // async and persistence actions
        let db = dbOpen(ctx.state.name);
        let docs = await findItem(db, {});
        ctx.commit("mutationRead", payload);
    },
};

export default {
    getters,
    actions,
    mutations,
};
