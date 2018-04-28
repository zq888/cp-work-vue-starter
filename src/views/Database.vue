<template>
  <v-layout row-wrap>
    <v-flex>
      <CreateDatabase />
    </v-flex>
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
