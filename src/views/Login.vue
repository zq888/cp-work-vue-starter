<template>
  <v-layout row wrap>
    <RegisterDialog />
  </v-layout>
</template>

<script>
// @ is an alias to /src
import RegisterDialog from "@/components/Shared/RegisterDialog.vue";

export default {
  components: {
    RegisterDialog
  }
};
</script>
