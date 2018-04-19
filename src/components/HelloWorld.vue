<template>
  <v-layout column>
    <v-flex xs12 sm6 offset-sm3>
      <v-toolbar color="indigo" dark>
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>Discover</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex
              v-bind="{ [`xs${card.flex}`]: true }"
              v-for="card in cards"
              :key="card.title"
            >
              <v-card>
                <v-card-media
                  :src="card.src"
                  height="200px"
                >
                  <v-container fill-height fluid>
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline white--text" v-text="card.title"></span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-media>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>favorite</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>bookmark</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>share</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter } from "vuex-class";

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  @State("title") private title: string;
  @State("dbName", { namespace: "User" })
  private userDbName: string;
  Message: string;

  cards: any[];

  constructor() {
    super();
  }

  created() {
    this.title;
    this.Message = "My message";
    this.cards = [
      {
        title: "Pre-fab homes",
        src: "https://vuetifyjs.com/static/doc-images/cards/house.jpg",
        flex: 12
      },
      {
        title: "Favorite road trips",
        src: "https://vuetifyjs.com/static/doc-images/cards/road.jpg",
        flex: 6
      },
      {
        title: "Best airlines",
        src: "https://vuetifyjs.com/static/doc-images/cards/plane.jpg",
        flex: 6
      }
    ];
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: cornflowerblue;
}
</style>
