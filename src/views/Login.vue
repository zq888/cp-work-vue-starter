<template>
  <v-layout row wrap>
    <v-dialog v-model="netlifyLoggedIn" width="80%">
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
import { Component, Prop, Vue } from "vue-property-decorator"
import { State, Action, Getter } from "vuex-class"
import RegisterDialog from "@/components/Shared/RegisterDialog.vue"
import UserLogin from "@/components/User/UserLogin.vue"

@Component({
  components: { RegisterDialog, UserLogin },
})
export default class Login extends Vue {
  // Props
  formTitle: string = "Login With Account"
  @State("netlifyLoggedIn") netlifyLoggedIn: boolean
  @State("firebaseLoggedIn") firebaseLoggedIn: boolean
  dialog: boolean = false
  doneLogin() {
    this.dialog = false
    // this.$router.push({ path: "/home" });
  }
}
</script>
