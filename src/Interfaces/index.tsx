import { ReactElement } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  currentScreen: string;
  singIn(email: string, password: string): Promise<boolean>;
  createUser(email: string, password: string, name: string): Promise<string>;
  updateUser(id: number, login: string | null, password: string | null, name: string | null): Promise<string>;
  singOut(): Promise<boolean>;
  selectScreen(eleme: string): void;
}

export interface ModalMessagesProps {
  props : {
    message: string;
  };
  onClose: () => void;
  children?: ReactElement;
}