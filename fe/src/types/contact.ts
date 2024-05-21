export type ContactParamsState = {
  name: string;
  email: string;
  message: string;
};

export interface ContactState {
  name: string;
  email: string;
  message: string;
  loading: boolean;
}

export enum ContactFields {
  name = 'name',
  email = 'email',
  password = 'password',
}
