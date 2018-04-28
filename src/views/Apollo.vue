<template>
  <v-layout row wrap>
    <v-flex>
    <ApolloExample />
    </v-flex>
  </v-layout>
</template>

<script>
// @ is an alias to /src
import ApolloExample from "@/components/Database/ApolloExample.vue";

export default {
  components: {
    ApolloExample
  }
};
</script>
