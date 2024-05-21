export interface RegisterCredentials {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export interface RegisterState {
  credentials: RegisterCredentials;
  loading: boolean;
  error: string | null;
}

export type RegisterCredentialsState = {
  username: string;
  password: string;
  email: string;
};

export enum RegisterFields {
  username = 'username',
  password = 'password',
  confirmPassword = 'confirmPassword',
  email = 'email',
}
