import { ChangeEventHandler } from 'react';

export type ValidationType = 'email' | 'pwd' | 'pwdConfirm';
export type ValidationClientType = 'name' | 'address';

export interface SignInputProps {
  placeholder: string;
  type: string | undefined;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  error?: boolean;
}

export interface SingInButtonProps {
  onClick: () => void;
  type: 'button' | 'submit' | 'reset';
  text: string;
}

export interface SingInState {
  email: string;
  pwd: string;
}

export interface SignUpState extends SingInState {
  pwdConfirm: string;
  emailError: string;
  pwdError: string;
  pwdConfirmError: string;
}

export interface ClientState {
  name: string;
  address: string;
  nameError: string;
  addressError: string;
  isBtnActive: boolean;
}
