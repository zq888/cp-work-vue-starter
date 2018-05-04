<template>
  <v-layout row wrap>
    <v-flex xs12 sm8 offset-sm2>
    <WorkBoard v-if="$route.params.page === 'board'" />
    <WorkInfo v-if="$route.params.page === 'info'" />
    <WorkTable v-if="$route.params.page === 'table'" />
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
// @ is an alias to /src
import WorkBoard from "@/components/Writer/WorkBoard.vue";
import WorkTable from "@/components/Writer/WorkTable.vue";
import WorkInfo from "@/components/Writer/WorkInfo.vue";

import { Prop, Watch, Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    WorkBoard,
    WorkTable,
    WorkInfo,
  },
})
export default class Writer extends Vue {}
</script>
