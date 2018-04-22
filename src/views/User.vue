<template>
  <div>
    <UserTable />
    <UserCard />
    <UserProfile />
    <UserGrid />
    <StatusBar />
  </div>
</template>

<script>
// @ is an alias to /src
import UserTable from "@/components/User/UserTable.vue";
import UserCard from "@/components/User/UserCard.vue";
import UserProfile from "@/components/User/UserProfile.vue";
import StatusBar from "@/components/Shared/StatusBar.vue";
import UserGrid from "@/components/User/UserGrid.vue";

export default {
  components: {
    UserTable,
    UserProfile,
    UserCard,
    UserGrid,
    StatusBar
  }
};
</script>
