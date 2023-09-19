export interface User {
    id: number | undefined;
    login: string | undefined;
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