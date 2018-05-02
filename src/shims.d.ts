declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "netlify-auth-providers";

declare namespace CPWork {
  /**
   * User Interface
   */
  export interface IUser {
    姓名: string;
    性别: string;
  }

  export interface IDocument {
    主送机关: string;
    事由: string;
  }

  export interface IDiplomaticDocument extends IDocument {
    主送机关: string;
    事由: string;
    序号: string;
    文种: string;
    密级: string;
    发文代码: string;
    主题词: string;
    _id?: string;
  }

  /**
   * Interface for Base State
   *
   * @export    IBaseState
   * @interface IBaseState
   */
  export interface IBaseState {
    name: string;
    items: any[];
    activeItem: any;
    filterKey?: string;
    sortKey?: string;
    token?: any;
  }

  /**
   * Payload for Base Module, only for IDiplomat as payload
   *
   * @export    IBasePayload
   * @interface IBasePayload
   */
  export interface IBasePayload {
    type: string;
    payload: IDiplomat;
  }

  /**
   * Interface for Dtabase Pool Model
   *
   * @export    IDatabasePool
   * @interface IDatabasePool
   */
  export interface IDatabasePool {
    [index: string]: any;
  }

  export interface IVuexAdaptor {
    userPath: string;
    pool: any;
    collections: string[];
    current: string;
    dbInit(): any;
    dbCreate(collection: string): any;
    dbRemove(collection: string): any;
    dbOpen(collection: string): any;
    dbSetCurrent(collection: string): any;
    findItem(db: any, query: any, table?: any): any;
    addItem(db: any, cleanPayload: any, table?: any): any;
    updateItem(db: any, query: any, cleanPayload: any, table?: any): any;
    removeItem(db: any, query: any, table?: any): any;
  }

  /**
   * Interface for Diplomat Model, extends IUser
   *
   * @export    IDiplomat
   * @interface IDiplomat
   */
  export interface IDiplomat extends IUser {
    序号: string;
    部门: string;
    姓名: string;
    性别: string;
    民族: string;
    出生日期: string;
    学历?: string;
    外语语种?: string;
    政治面貌?: string;
    行政级别?: string;
    提级时间?: string;
    对外身份?: string;
    对内身份?: string;
    担任工作?: string;
    派出单位?: string;
    到馆时间?: string;
    离馆时间?: string;
    出国前单位?: string;
    备注?: string;
  }

  /**
   * Datafile from which load options
   *
   * @export
   * @interface Datafile
   */
  export interface Datafile {
    filename: string;
    path: string;
  }
}

declare class Diplomat {
  name: string;
  gender: string;
  constructor(name?: CPWork.IUser);

  persistence?: CPWork.Datafile;

  /**
   * Load the user from the datafile
   */
  loadFrom?(cb?: (err: Error) => void): void;

  /**
   * Get an array of all the data in the database
   */
  getProperties?(): object;
}
