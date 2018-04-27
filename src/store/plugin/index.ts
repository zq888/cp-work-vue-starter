import { PersistencePlugin } from "./fireBasePlugin";

const plugins: any[] = [
  PersistencePlugin({ namespace: "User" }),
  PersistencePlugin({ namespace: "Document" }),
  PersistencePlugin({ namespace: "Database" })
];

export default plugins;
