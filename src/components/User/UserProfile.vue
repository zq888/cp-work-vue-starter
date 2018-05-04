<template>
  <v-layout justify-center column>
    <v-flex>
     <v-card color="purple darken-5" class="white--text">
      <v-container fluid grid-list-lg>
        <v-layout row>
          <v-flex xs7>
            <div>
              <div class="display-3">{{activeItem["姓名"]}}</div>
              <div class="headline">{{activeItem["部门"]}}</div>
            </div>
          </v-flex>
          <v-flex xs5>
            <v-card-media
              src="https://vuetifyjs.com/static/doc-images/cards/halcyon.png"
              height="125px"
              contain
            ></v-card-media>
          </v-flex>
        </v-layout>
        <v-layout color="white" row fluid wrap>
          <v-flex xs12>
            <v-card color="purple darken-1" class="white--text">
            <v-card-title>
              <div >对外身份</div>
            </v-card-title>
            <v-card-text>
              <div >{{activeItem["对外身份"]}}</div>
            </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs6>
            <v-card color="purple darken-1" class="white--text">
            <v-card-title>
              <div >学历</div>
            </v-card-title>
            <v-card-text>
              <div >{{activeItem["学历"]}}</div>
            </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs6>
            <v-card color="purple darken-1" class="white--text">
            <v-card-title>
              <div >民族</div>
            </v-card-title>
            <v-card-text>
              <div >{{activeItem["民族"]}}</div>
            </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs6>
            <v-card color="purple darken-1" class="white--text">
            <v-card-title>
              <div >到馆日期</div>
            </v-card-title>
            <v-card-text>
              <div >{{activeItem["到馆时间"]}}</div>
            </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs6>
            <v-card color="purple darken-1" class="white--text">
            <v-card-title>
              <div >离馆日期</div>
            </v-card-title>
            <v-card-text>
              <div >{{activeItem["离馆时间"]}}</div>
            </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    </v-flex>
  </v-layout>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Mutation, Action, Getter } from "vuex-class";

import * as types from "@/store/types";
import UserInfo from "@/components/User/UserInfo.vue";
import { defaultUser } from "@/store/Model/BaseModel";
const nsUser = { namespace: types.nsUser };

@Component({
  components: { UserInfo },
})
export default class UserProfile extends Vue {
  // Props
  editIndex: number = -1;
  // State
  @State("activeItem", nsUser)
  activeItem: object;
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

  constructor() {
    super();
  }

  mounted() {}
}
</script>
