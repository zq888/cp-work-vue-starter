import Base from "./Base";

import { IBaseState as State } from "@/store/Model/BaseModel";

const state: State = {
    name: "user",
    items: [{ id: "xing wenju", icon: "click" }],
    activeItem: {},
    filterKey: "",
    sortKey: "",
};

export default {
    namespaced: true,
    state,
    mutations: Base.mutations,
    actions: Base.actions,
    getters: Base.getters,
};
