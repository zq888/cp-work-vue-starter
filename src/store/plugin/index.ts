import { FirebasePlugin, PersistencePlugin } from "./fireBasePlugin";

const plugins: any[] = [
  PersistencePlugin({ namespace: "User" }),
  PersistencePlugin({ namespace: "Document" }),
  PersistencePlugin({ namespace: "Database" }),
  PersistencePlugin({ namespace: "Writer" }),
  // FirebasePlugin({ namespace: "User" }),
  // FirebasePlugin({ namespace: "Document" }),
  // FirebasePlugin({ namespace: "Database" })
];

export default plugins;
