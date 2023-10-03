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

export async function createUser(login: string, password: string, name: string): Promise<string> {
  var data = new FormData();
  data.append('login', login);
  data.append('password', password);

  return new Promise((resolve) => {
    api.post<string>('/users', data).then(response => {
      resolve(response.data as string);
    });
  });
}

export async function updateUser(id: number, login: string, password: string, name: string): Promise<string> {
  var data = new FormData();
  data.append('id', id as unknown as string);
  data.append('login', login);
  data.append('password', password);

  return new Promise((resolve) => {
    api.put<string>('/users/update', data).then(response => {
      resolve(response.data as string);
    });
  });
}