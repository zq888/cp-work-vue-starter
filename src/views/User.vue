<template>
  <div>
    {{$route.params.page}}
    <UserTable v-if="$route.params.page === 'table'" />
    <UserCard v-if="$route.params.page === 'card'" />
    <UserProfile v-if="$route.params.page === 'profile'" />
    <UserGrid v-if="$route.params.page === 'grid'" />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import UserTable from "@/components/User/UserTable.vue";
import UserCard from "@/components/User/UserCard.vue";
import UserProfile from "@/components/User/UserProfile.vue";
import StatusBar from "@/components/Shared/StatusBar.vue";
import UserGrid from "@/components/User/UserGrid.vue";
import UserInfo from "@/components/User/UserInfo.vue";

import { Prop, Watch, Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    UserTable,
    UserProfile,
    UserCard,
    UserGrid,
    UserInfo,
    StatusBar
  }
})
export default class User extends Vue {}
</script>
