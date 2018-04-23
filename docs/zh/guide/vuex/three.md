# Vue call


## `components/user/UserTable.vue`

```js
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Mutation, Action, Getter } from "vuex-class";

import * as types from "@/store/types";
import UserInfo from "@/components/User/UserInfo.vue";
import { defaultUser } from "@/store/Model/BaseModel";
const nsUser = { namespace: types.nsUser };

@Component({
  components: { UserInfo }
})
export default class UserLogin extends Vue {
  // State
  @State("activeItem", nsUser)
  activeItem!: object;
  @State("items", nsUser)
  items: any[];
  // Getters
  @Getter("itemFiltered", nsUser)
  itemFiltered: any[];
  // Mutations
  @Mutation(types.mSetActive, nsUser)
  setActive: Function;
  @Mutation(types.mSetValue, nsUser)
  setValue: Function;
  // Actions
  @Action(types.aCreate, nsUser)
  createItem: Function;
  @Action(types.aDelete, nsUser)
  deleteItem: Function;
  @Action(types.aUpdate, nsUser)
  updateItem: Function;

  constructor() {
    super();
  }

  editItem(item: any) {
    this.setActive(item);
  }

}
```