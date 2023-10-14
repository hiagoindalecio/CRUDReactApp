import { ReactElement } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface Person {
  id: number;
  idCreator: number;
  name: string;
  age: number;
}

export interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  singIn(email: string, password: string): Promise<boolean>;
  createUser(email: string, password: string, name: string): Promise<boolean>;
  updateUser(id: number, email: string, password: string, name: string): Promise<boolean>;
  singOut(): Promise<boolean>;
}

export interface PersonalizedModalsProps {
  message?: string;
  title?: string;
  hasConfirmButton?: boolean;
  confirmButtonType?: 'submit' | 'reset' | 'button' | undefined;
  confirmButtonForm?: string | undefined;
  onConfirm?: () => void;
  onClose?: () => void;
  children?: ReactElement;
}