export type LoginCredentialsState = {
  username: string;
  password: string;
};

export interface LoginCredentials {
  username: string;
  password: string;
}

export enum Roles {
  admin = 'admin',
  leader = 'leader',
  user = 'user',
}

export interface LoginState {
  credentials: LoginCredentials;
  role: Roles | null;
  id: string | null;
  loading: boolean;
  error: string | null;
}

export enum LoginFields {
  username = 'username',
  password = 'password',
}
