<template>
  <v-container>
  <v-layout row wrap class="login">
      <v-flex xs12 md6 offset-md3>
          <UserLogin />
      </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/Shared/HelloWorld.vue";
import UserLogin from "@/components/User/UserLogin.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    UserLogin,
  },
};
</script>
