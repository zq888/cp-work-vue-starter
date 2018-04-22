<template>
  <div>
    <UserTable />
  </div>
</template>

<script>
// @ is an alias to /src
import UserTable from "@/components/User/UserTable.vue";
import UserCard from "@/components/User/UserCard.vue";
import UserProfile from "@/components/User/UserProfile.vue";
import StatusBar from "@/components/Shared/StatusBar.vue";
import UserGrid from "@/components/User/UserGrid.vue";
import UserInfo from "@/components/User/UserInfo.vue";

export default {
  components: {
    UserTable,
    UserProfile,
    UserCard,
    UserGrid,
    UserInfo,
    StatusBar
  }
};
</script>
