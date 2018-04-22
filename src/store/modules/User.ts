import Base from "./Base";

import { IBaseState as State, defaultUser } from "@/store/Model/BaseModel";

const state: State = {
    name: "user",
    items: [],
    activeItem: defaultUser,
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
