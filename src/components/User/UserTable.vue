<template>
  <div>
    <v-btn @click="openDialog" color="primary" dark slot="activator" class="mb-2">New</v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
              <UserInfo :editing="editing" />
              <v-btn @click="dialog = false">close</v-btn>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-data-table
      :headers="headers"
      :items="itemFiltered"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item['姓名'] }}</td>
        <td class="text-xs-right">{{ props.item['部门'] }}</td>
        <td class="text-xs-right">{{ props.item['性别'] }}</td>
        <td class="text-xs-right">{{ props.item['民族'] }}</td>
        <td class="text-xs-right">{{ props.item['学历'] }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>
<script lang="ts">
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
  // Props
  dialog: boolean = false;
  editing: boolean = false;
  formTitle: string = "人员信息";
  headers: any[];
  editIndex: number = -1;
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
    this.dialog = false;
    this.editing = false;
    this.headers = [
      {
        text: " 姓名",
        align: "left",
        sortable: false,
        value: " 姓名"
      },
      { text: "部门", value: "部门" },
      { text: "性别", value: "性别" },
      { text: "民族", value: "民族" },
      { text: "学历", value: "学历" }
    ];
  }

  editItem(item: any) {
    this.editing = true;
    this.setActive(item);
    this.dialog = true;
  }
  openDialog() {
    this.editing = false;
    this.setActive(defaultUser);
    this.dialog = true;
  }
}
</script>
