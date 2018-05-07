<template>
  <v-layout row wrap>
    <v-flex xs12 sm8 offset-sm2>
    <!-- {{$route.params.page}} -->
    <Trello />
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
// @ is an alias to /src
import Trello from "@/components/Trello/Index.vue";

import { Prop, Watch, Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    Trello,
  },
})
export default class User extends Vue {}
</script>
