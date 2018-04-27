<template>
  <v-stepper v-model="e1" height="800px">
    <v-stepper-header>
      <v-stepper-step step="1" :complete="e1 > 1">step 1</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="2" :complete="e1 > 2">step 2</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3">Name of step 3</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card color="lighten-1" class="mb-5" height="500px">
           <v-form>
             <v-text-field v-model="dbName"></v-text-field>
           </v-form>
        </v-card>
        <v-btn color="primary" @click.native="e1 = 2">Continue</v-btn>
        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card color="lighten-1" class="mb-5" height="500px">
          <v-form>
            <v-text-field 
            v-model="fieldName"
            @keyup.enter="addField({name: fieldName, value: 'value'})"
            ></v-text-field>
          </v-form>
          <v-flex md6 sm12>
              <v-chip
              v-for="(f, i) in fields"
              :key="i" 
              >{{f.name}}-{{f.value}}
              </v-chip>
          </v-flex>
        </v-card>
        <v-btn color="primary" @click.native="e1 = 3">Continue</v-btn>
        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>
      <v-stepper-content step="3">
        <v-card color="lighten-1" class="mb-5" height="500px">
          <v-flex md6 sm12>
             <v-text-field v-for="(item, index) in items" :key="index" :value="item"></v-text-field>
          </v-flex>
        </v-card>
        <v-btn color="primary" @click.native="addItem(dbName)">Finish</v-btn>
        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Mutation, Action, Getter } from "vuex-class";

import * as types from "@/store/types";

import { defaultUser } from "@/store/Model/BaseModel";
const nsDatabase = { namespace: types.nsDatabase };

@Component({
  components: {}
})
export default class CreateDatabaseSteper extends Vue {
  // Props
  e1: number = 0;

  dbName: string = "dbName";
  fieldName: string = "";
  fields: object[] = [
    {
      name: "field1",
      value: "value"
    }
  ];

  // State
  @State("name", nsDatabase)
  name: string;
  @State("activeItem", nsDatabase)
  activeItem: object;
  @State("items", nsDatabase)
  items: any[];
  @State("filterKey") globalFilterKey: string;
  // Getters
  @Getter("itemFiltered", nsDatabase)
  itemFiltered: any[];
  @Getter("itemKeys", nsDatabase)
  itemKeys: any[];
  // Mutations
  @Mutation(types.mSetActive, nsDatabase)
  setActive: Function;
  @Mutation(types.mSetValue, nsDatabase)
  setValue: Function;
  // Actions
  @Action(types.aCreate, nsDatabase)
  createItem: Function;
  @Action(types.aDelete, nsDatabase)
  deleteItem: Function;
  @Action(types.aUpdate, nsDatabase)
  updateItem: Function;

  constructor() {
    super();
  }

  navigate(payload: string) {
    this.$router.push({ path: "/database", params: { name: payload } });
  }

  editItem(item: any) {
    this.setActive(item);
  }

  addField(newField: object) {
    this.fields.push(newField);
  }

  addItem(item: any) {
    this.createItem(item);
  }
}
</script>
