<template>
  <div></div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Mutation, Action, Getter } from "vuex-class";

import * as types from "@/store/types";
import DocumentInfo from "@/components/Document/DocumentInfo.vue";
import { defaultWriterWork } from "@/store/Model/BaseModel";
const nsWriter = { namespace: types.nsWriter };

@Component({
  components: { DocumentInfo },
})
export default class DocumentCard extends Vue {}
</script>
