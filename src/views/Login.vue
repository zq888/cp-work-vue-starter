<template>
  <v-layout row wrap>
    <v-flex>
      <UserLogin />
    </v-flex>
  </v-layout>
</template>

<script>
// @ is an alias to /src
import RegisterDialog from "@/components/Shared/RegisterDialog.vue";
import UserLogin from "@/components/User/UserLogin.vue";

export default {
  components: {
    RegisterDialog,
    UserLogin
  }
};
</script>
