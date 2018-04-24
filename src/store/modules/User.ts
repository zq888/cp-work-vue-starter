import Base from "./Base";

import { defaultUser } from "@/store/model/BaseModel";

const state: CPWork.IBaseState = {
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
