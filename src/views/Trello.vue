<template>
  <v-layout row wrap>
    <v-flex xs12 sm8 offset-sm2>
    <!-- {{$route.params.page}} -->
    <TrelloIndex v-if="$route.params.page === 'index'"/>
    <TrelloBoard v-if="$route.params.page === 'board'"/>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
// @ is an alias to /src
import TrelloIndex from "@/components/Trello/Index.vue";
import TrelloBoard from "@/components/Trello/Board.vue";

import { Prop, Watch, Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    TrelloIndex,
    TrelloBoard,
  },
})
export default class Trello extends Vue {}
</script>
