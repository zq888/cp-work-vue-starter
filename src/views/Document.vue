<template>
    <v-layout row wrap>
      <v-flex xs12>
        <DocumentCard v-if="$route.params.page === 'card'"/>
        <DocumentTable v-if="$route.params.page === 'table'"/>
      </v-flex>
    </v-layout>
</template>

<script lang="ts">
// @ is an alias to /src
import DocumentTable from "@/components/Document/DocumentTable.vue";
import DocumentCard from "@/components/Document/DocumentCard.vue";

import { Prop, Watch, Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    DocumentTable,
    DocumentCard,
  },
})
export default class Document extends Vue {
  pages: string[] = ["table", "card", "profile", "grid"];
}
</script>
