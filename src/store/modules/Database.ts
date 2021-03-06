import Base from "./Base";

import { collections } from "@/store/Model/BaseModel";

const state: CPWork.IBaseState = {
    name: "db",
    items: [],
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
