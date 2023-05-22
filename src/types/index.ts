export type LoginFromValue = { username: string; password: string }; // Form的一部分输入值类型定义 或者 （名称/值
export type StudentFormValue = {
  studentName: string;
  studentNum: string;
};

export type StudentPageListItem = {
  id: number;
  studentNum: string;
  studentName: string;
};

export type StudentSearchFormValue = {
  studentNum: string;
  studentName: string;
}; // 用于排序的参数类型，可以是字符串或数字
