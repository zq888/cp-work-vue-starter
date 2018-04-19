import Base from "./Base";

import { baseState as State } from "@/store/model/BaseModel";

const state: State = {
  name: "user",
  items: [],
  activeItem: {},
  filterKey: "",
  sortKey: ""
};

export default {
  namespaced: true,
  state,
  mutations: Base.mutations,
  actions: Base.actions,
  getters: Base.getters
};
