<template>
      <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          添加文章或日志
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-avatar size="40px" class="mr-3">
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt=""
                  >
                </v-avatar>
                <v-text-field v-model="title" placeholder="标题" ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-avatar size="40px" class="mr-3">
                  <v-icon class="material-icon">create</v-icon>
                </v-avatar>
                <v-text-field
                  v-model="writer"
                  placeholder="作者姓名"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-avatar size="40px" class="mr-3">
                  <v-icon class="material-icon">alarm</v-icon>
                </v-avatar>
                <v-text-field
                  v-model="createdDate"
                  placeholder="日期"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                rows=20
                clearable
                multi-line
                v-model="content"
                prepend-icon="notes"
                placeholder="内容"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn flat @click="addItem">Save</v-btn>
          <v-btn flat color="primary" @click="clearItem">Cancel</v-btn>
        </v-card-actions>
      </v-card>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Mutation, Action, Getter } from "vuex-class";

import * as types from "@/store/types";
import { defaultWriterWork } from "@/store/Model/BaseModel";
const nsWriter = { namespace: types.nsWriter };

@Component({
  components: {},
})
export default class WorkBoard extends Vue {
  // Props
  editing: boolean = false;
  title: string = "作业标题";
  writer: string = "作者";
  createdDate: string = "2018-05-01";
  content: string = "内容";
  // State
  @State("activeItem", nsWriter)
  activeItem: any;
  @State("items", nsWriter)
  items: any[];
  @State("filterKey") globalFilterKey: string;
  // Getters
  @Getter("itemFiltered", nsWriter)
  itemFiltered: any[];
  @Getter("itemKeys", nsWriter)
  itemKeys: any[];
  // Mutations
  @Mutation(types.mSetActive, nsWriter)
  setActive: Function;
  @Mutation(types.mSetValue, nsWriter)
  setValue: Function;
  @Mutation(types.mSetFilter, nsWriter)
  setFilter: Function;
  // Actions
  @Action(types.aCreate, nsWriter)
  createItem: Function;
  @Action(types.aDelete, nsWriter)
  deleteItem: Function;
  @Action(types.aUpdate, nsWriter)
  updateItem: Function;

  constructor() {
    super();
  }

  created() {
    this.asyncActiveItem();
  }
  mounted() {}

  asyncActiveItem() {
    this.title = this.activeItem["标题"];
    this.content = this.activeItem["正文"];
    this.writer = this.activeItem["作者"];
    this.createdDate = this.activeItem["日期"];
  }

  navigate(payload: string) {
    this.$router.push({ path: "/writer/table", params: { id: payload } });
  }

  clearItem() {}

  addItem() {
    if (this.$route.params.editing === "true") {
      let newItem = {
        _id: this.$route.params.id,
        标题: this.title,
        正文: this.content,
        日期: this.createdDate,
        作者: this.writer,
        标签: "SS",
      };
      this.updateItem(newItem);
    } else {
      let newItem = {
        标题: this.title,
        正文: this.content,
        日期: this.createdDate,
        作者: this.writer,
        标签: "SS",
      };
      this.createItem(newItem);
    }
    this.navigate("");
  }
}
</script>
