<template>
  <v-layout row-wrap>
    <CreateDatabase />
  </v-layout>
</template>

<script>
// @ is an alias to /src
import CreateDatabase from "@/components/Database/CreateDatabase.vue";

export default {
  components: {
    CreateDatabase
  }
};
</script>
