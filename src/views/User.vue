<template>
  <div>
    <UserTable />
    <UserCard />
  </div>
</template>

<script>
// @ is an alias to /src
import UserTable from "@/components/User/UserTable.vue";
import UserCard from "@/components/User/UserCard.vue";

export default {
  components: {
    UserTable,
    UserCard
  }
};
</script>
