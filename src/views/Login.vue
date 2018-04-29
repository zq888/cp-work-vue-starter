<template>
  <v-layout row wrap>
    <v-dialog v-model="dialog" width="80%">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
              <UserLogin />
              <v-btn @click="doneLogin">close</v-btn>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import RegisterDialog from "@/components/Shared/RegisterDialog.vue";
import UserLogin from "@/components/User/UserLogin.vue";

@Component({
  components: { RegisterDialog, UserLogin }
})
export default class Login extends Vue {
  // Props
  formTitle: string = "Login With Account";
  dialog: boolean = true;
  doneLogin() {
    this.dialog = false;
    // this.$router.push({ path: "/home" });
  }
}
</script>
