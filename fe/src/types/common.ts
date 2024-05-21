import { Dispatch, SetStateAction } from 'react';

export enum Languages {
  en = 'en',
  ro = 'ro',
}

export type Logos = {
  [key: string]: string;
};

export enum SnackbarType {
  success = 'success',
  error = 'error',
}

export const NUMBER_OF_ROUNDS = 6;

export const MIN_SCORE = 0;

export const MAX_SCORE_JOKER = 32;

export enum ErrorCodes {
  CREDENTIALS_REQUIRED = 'CREDENTIALS_REQUIRED',
  GAME_ALREADY_EXISTS = 'GAME_ALREADY_EXISTS',
}

export type ProviderProps = {
  children: string | JSX.Element | JSX.Element[];
};

export type SnackbarState = {
  message: string | null;
  type: SnackbarType | null;
};

export type AdminContextType = {
  isAdmin: boolean;
  setIsAdmin: Dispatch<SetStateAction<boolean>>;
};

export type LoaderProps = ProviderProps & {
  loading: boolean;
};

export type ActionModalProps = {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  action: (...args: any[]) => void;
  title: string;
  content: string;
  actionName: string;
  children?: string | JSX.Element | JSX.Element[];
};

export type ThemeSelectorState = {
  mode: string;
};

export enum Themes {
  dark = 'dark',
  light = 'light',
}

export type FAQProps = {
  question: string;
  answer: string;
};
