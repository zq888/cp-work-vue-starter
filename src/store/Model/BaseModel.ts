export const collections = ["db", "config", "document", "writer", "todo", "im", "user"];

export const defaultUser: CPWork.IDiplomat = {
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
  备注: "无",
};

export const defaultDocument: CPWork.IDiplomaticDocument = {
  序号: "1",
  文种: "委参发",
  密级: "内部",
  主送机关: "机构",
  发文代码: "",
  事由: "开发国际机构管理系统",
  主题词: "vue",
};

export const defaultWriterWork = {
  序号: "1",
  标题: "东东社会调查作业",
  正文: "日本介绍",
  日期: "2018-5-1",
  作者: "邢潇睿",
  标签: "SS",
};

export const UserInitOptions: CPWork.IUser = {
  姓名: "xing wenju",
  性别: "male",
};

export const DocumentInitOptions = {
  序号: "",
  文种: "",
  密级: "",
  主送机关: "",
  发文代码: "",
  事由: "",
  主题词: "",
};

export const BookmarkInitOptions = {
  名称: "",
  链接: "",
  标签: "",
};

export class userModel implements Diplomat {
  name: string;
  gender: string;

  constructor(user: CPWork.IUser) {
    this.name = user.姓名;
    this.gender = user.性别;
  }
}

export const user = new userModel(UserInitOptions);
