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
        <v-layout color="white" row>
          <v-flex xs4>
            <v-card color="blue-grey darken-2" class="white--text">
            <div>
              <div class="title">到馆日期:{{activeItem["到馆时间"]}}</div>
              <div class="title">离馆日期:{{activeItem["离馆时间"]}}</div>
            </div>
            </v-card>
          </v-flex>
          <v-flex xs4>
            <v-card color="blue-grey darken-2" class="white--text">
            <div>
              <div class="title">{{activeItem["学历"]}}</div>
              <div class="title">{{activeItem["部门"]}}</div>
            </div>
            </v-card>
          </v-flex>
          <v-flex xs4>
            <v-card color="blue-grey darken-2" class="white--text">
            <div>
              <div class="title">{{activeItem["对外身份"]}}</div>
              <div class="title">{{activeItem["对内身份"]}}</div>
            </div>
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
