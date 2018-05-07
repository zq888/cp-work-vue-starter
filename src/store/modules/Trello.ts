import Base from "./Base";

const state: CPWork.IBaseState = {
  name: "trello",
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
