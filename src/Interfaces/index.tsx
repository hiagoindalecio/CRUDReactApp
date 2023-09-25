import { ReactElement } from "react";

export interface User {
  id: number;
  login: string;
}

export interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  currentScreen: string;
  singIn(email: string, password: string): Promise<string>;
  createUser(email: string, password: string, name: string, image: File): Promise<string>;
  updateUser(id: number, name: string | null, password: string | null, image: File | null): Promise<string>;
  singOut(email: string, password: string): Promise<string>;
  selectScreen(eleme: string): void;
}

export interface ModalMessagesProps {
  props : {
    message: string;
  };
  onClose: () => void;
  children?: ReactElement;
}

export interface DropzoneProps {
  onFileUploaded: (file: File) => void;
}