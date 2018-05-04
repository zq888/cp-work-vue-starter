import Base from "./Base";

import { defaultWriterWork } from "@/store/Model/BaseModel";

const state: CPWork.IBaseState = {
  name: "writer",
  items: [],
  activeItem: defaultWriterWork,
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
