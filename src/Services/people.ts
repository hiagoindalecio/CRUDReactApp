import { Person } from '../Interfaces';
import api from './api';

export async function findPeople(idCreator: number): Promise<Person[] | undefined> {
  return new Promise((resolve) => {
    api.get<string>(`/people?idCreator=${idCreator}`).then(response => {
      var people = response.data as unknown as Array<Person>;
      if (people.length == 0) // Empty result
        resolve(undefined);
      else
        resolve(people);
    });
  });
}

export async function createPerson(email: string, password: string, name: string): Promise<string> {
  var data = new FormData();
  data.append('...', email);

  return new Promise((resolve) => {
    api.post<string>('/people', data).then(response => {
      resolve(response.data as string);
    });
  });
}

export async function updatePerson(id: number, email: string, password: string, name: string): Promise<string> {
  var data = new FormData();
  data.append('id', id as unknown as string);
  data.append('login', email);
  data.append('password', password);

  return new Promise((resolve) => {
    api.put<string>('/people/update', data).then(response => {
      resolve(response.data as string);
    });
  });
}