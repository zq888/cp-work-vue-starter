<template>
  <div>
    <v-btn @click="addItem" color="primary" dark slot="activator" class="mb-2">New</v-btn>
    <v-dialog v-model="dialog" width="80%">
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
        <td :key="header.text" :autocomplete="props.item[header.text]"
            v-for="header in headers">
            {{ props.item[header.text] }}
        </td>
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
  @Getter("itemKeys", nsUser)
  itemKeys: any[];
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
      /* {
         *   text: "姓名",
         *   align: "left",
         *   value: "姓名",
         * },
         * { text: "部门", value: "部门" },
         * { text: "性别", value: "性别" },
         * { text: "民族", value: "民族" },
         * { text: "学历", value: "学历" },
         * { text: "外语语种", value: "外语语种" },
         * { text: "对内身份", value: "对内身份" },
         * { text: "对外身份", value: "对外身份" },
         * { text: "行政级别", value: "行政级别" },
         * { text: "担任工作", value: "担任工作" },*/
    ];
  }

  mounted() {
    this.headerBuilder();
  }

  headerBuilder() {
    this.itemKeys.map((key, index) => {
      if (index > 10) return;
      this.headers.push({ text: key, value: key, align: "left" });
    });
  }

  editItem(item: any) {
    this.editing = true;
    this.setActive(item);
    this.dialog = true;
  }

  addItem() {
    this.editing = false;
    this.setActive(defaultUser);
    this.dialog = true;
  }
}
</script>
