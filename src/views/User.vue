<template>
  <div>
    <UserTable />
    <UserCard />
    <UserProfile />
    <StatusBar />
  </div>
</template>

<script>
// @ is an alias to /src
import UserTable from "@/components/User/UserTable.vue";
import UserCard from "@/components/User/UserCard.vue";
import UserProfile from "@/components/User/UserProfile.vue";
import StatusBar from "@/components/Shared/StatusBar.vue";

export default {
  components: {
    UserTable,
    UserProfile,
    UserCard,
    StatusBar
  }
};
</script>
