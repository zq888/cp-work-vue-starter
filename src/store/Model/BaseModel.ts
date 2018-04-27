export const collections = ["db", "config", "document", "user"];

export const defaultUser = {
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
