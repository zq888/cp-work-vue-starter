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
    [types.mCreate]: (state: State, payload: any) => {
        state.items.push(payload);
    },
    [types.mDelete]: (state: State, payload: any) => {
        state.items.push(payload);
    },
    [types.mUpdate]: (state: State, payload: any) => {
        state.items.push(payload);
    },
    [types.mRead]: (state: State, payload: any) => {
        state.items.push(payload);
    },
    [types.mSet]: (state: State, payload: any) => {
        state.activeItem[payload.target.name] = payload.target.value;
    },
};

const actions = {
    [types.aCreate]: async (ctx: ActionContext<State, any>, payload: any) => {
        // async and persistence actions
        let { _id, ...cleanPayload } = payload;
        let newDoc = await addItem(dbOpen(state.name), cleanPayload);
        ctx.commit("mutationCreate", newDoc);
    },
    [types.aDelete]: async (ctx: ActionContext<State, any>, payload: any) => {
        // async and persistence actions
        let n = await removeItem(dbOpen(state.name), {
            _id: payload._id,
        });
        if (n !== null) ctx.commit("mutationDelete", payload._id);
    },
    [types.mUpdate]: async (ctx: ActionContext<State, any>, payload: any) => {
        // async and persistence actions
        let { _id, ...cleanPayload } = payload;
        let query = {
            _id: payload._id,
        };
        let n = await updateItem(dbOpen(state.name), query, cleanPayload);
        if (n !== null) ctx.commit("mutationUpdate", payload);
        ctx.commit("mutationUpdate", payload);
    },
    [types.mRead]: async (ctx: ActionContext<State, any>, payload: any) => {
        // async and persistence actions
        let db = dbOpen(state.name);
        let docs = await findItem(db, {});
        ctx.commit("mutationRead", payload);
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
