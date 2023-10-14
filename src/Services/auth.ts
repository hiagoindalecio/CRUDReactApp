import { User } from '../Interfaces';
import api from './api';

export async function singIn(email: string, password: string): Promise<User | undefined> {
  return new Promise((resolve) => {
    api.get<string>(`/users?email=${email}&password=${password}`).then(response => {
      var user = response.data as unknown as Array<User>;
      if (user.length == 0) // Empty result
        resolve(undefined);
      else
        resolve(user[0]);
    });
  });
}

export async function createUser(email: string, password: string, name: string): Promise<boolean> {
  return new Promise((resolve) => {
    api.post<string>('/users', {
      email,
      password,
      name
    }).then(response => {
      resolve(response.status === 200);
    });
  });
}

export async function updateUser(id: number, email: string, password: string, name: string): Promise<boolean> {
  return new Promise((resolve) => {
    api.put<string>(`/users/${id}`, {
      email,
      password,
      name
    }).then(response => {
      resolve(response.status === 200);
    });
  });
}