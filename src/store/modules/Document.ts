import Base from "./Base";

import { defaultDocument } from "@/store/Model/BaseModel";

const state: CPWork.IBaseState = {
  name: "document",
  items: [],
  activeItem: defaultDocument,
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
