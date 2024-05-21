export interface User {
  username: string;
  password: string;
  email: string;
  role: Roles;
}

export type UserType = {
  _id: string;
  username: string;
};

export enum Roles {
  admin = 'admin',
  user = 'user',
}
