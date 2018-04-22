<template>
  <div>
    <UserInfo />
  </div>
</template>

<script>
// @ is an alias to /src
import UserLogin from "@/components/User/UserLogin.vue";
import UserInfo from "@/components/User/UserInfo.vue";

export default {
  components: {
    UserLogin,
    UserInfo
  }
};
</script>
