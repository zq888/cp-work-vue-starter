# Vue

::: tip
+ In the component, we can use like this
:::

```js
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("User", ["items", "currentItem", "filterKey", "sortKey", "editing", "dbName"]),
    ...mapGetters("User", ["filteredData", "count", "itemFieldNames"]),
  },
  methods: {
    ...mapActions("User", [
      "DB_SELECT_DATABASE",
      "DB_FIND_ITEMS",
      "DB_CREATE_ITEM",
      "DB_UPDATE_ITEM",
      "DB_DELETE_ITEM",
      "DB_CLEAR_ITEM",
    ]),
    ...mapMutations("User", [
      "SELECT_DATABASE",
      "CREATE_ITEM",
      "DELETE_ITEM",
      "UPDATE_ITEM",
      "FIND_ITEMS",
      "CLEAR_ITEMS",
      "UPDATE_MODEL",
      "SET_CURRENT_ITEM",
      "SET_EMPTY_ITEM",
      "TOOGLE_EDIT",
      "UPDATE_FILTERKEY",
      "UPDATE_SORTKEY",
    ])
  }
}
```
::: tip
+ Or you can use the `class` component definition as in `BookmarkPage.vue`
:::

```js
import { Component, Vue } from "vue-property-decorator";
import { State, Getter, Mutation, Action, namespace } from "vuex-class";

const BookmarkState = namespace("Bookmark", State);
const BookmarkGetter = namespace("Bookmark", Getter);
const BookmarkAction = namespace("Bookmark", Action);
const BookmarkMutation = namespace("Bookmark", Mutation);

@Component
export default class User extends Vue {

  @BookmarkState("dbName") dbName: string;

  @BookmarkGetter("filteredData") filteredData: any[];
  @BookmarkGetter("itemFieldNames") itemFieldNames: string[];

  @BookmarkAction("DB_SELECT_DATABASE") selectDb: Function;
  @BookmarkAction("DB_FIND_ITEMS") find: Function;
  @BookmarkAction("DB_CREATE_ITEM") create: Function;
  @BookmarkAction("DB_DELETE_ITEM") remove: Function;

  createBookmark() {
    this.create({ title: this.title, url: this.url });
  }

  removeBookmark(bookmark: any) {
    this.remove(bookmark);
  }
}
```