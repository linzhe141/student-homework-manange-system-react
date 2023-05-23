export type LoginFromValue = { username: string; password: string };
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
};

export type UserFormValue = {
  username: string;
  password: string;
};

export type UserPageListItem = {
  id: number;
  username: string;
};

export type UserSearchFormValue = {
  username: string;
  type: string | number;
};
