export const collections = ["user", "config", "document", "scheme", "test"];

// Base Interface
export interface baseState {
  name: string;
  items: any[];
  activeItem: any;
  filterKey?: string;
  sortKey?: string;
}

export interface basePayload {
  id: number;
}

export interface databasePool {
  [index: string]: any;
}

// User Interface
export interface User {
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

export const defaultUser: User = {
  序号: "1",
  部门: "馆领导",
  姓名: "邢文聚",
  性别: "男",
  民族: "汉",
  出生日期: "1978-09-16",
  学历: "硕士研究生",
  外语语种: "西班牙语",
  政治面貌: "党员",
  行政级别: "正处",
  提级时间: "2016-4-1",
  对外身份: "参赞",
  对内身份: "无",
  担任工作: "首席馆员",
  派出单位: "外交部",
  到馆时间: "2016-04-09",
  离馆时间: "2020-04-08",
  出国前单位: "外交部",
  备注: "无"
};

export const userSchema = {
  序号: "",
  姓名: "",
  部门: "",
  性别: "",
  使馆: ""
};

export const documentSchema = {
  序号: "",
  文种: "",
  密级: "",
  主送机关: "",
  发文代码: "",
  事由: "",
  主题词: ""
};

export const bookmarkSchema = {
  名称: "",
  链接: "",
  标签: ""
};
