import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { User } from '../models/user';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);

  users = signal<User[]>([]);

  load() {
    const jsonFile = 'assets/users.json';

    return new Promise((resolve, reject) => {
      lastValueFrom(this.http.get<any>(jsonFile))
        .then((res) => {
          this.users.set(res);
          resolve(this.users);
        })
        .catch((res) => {
          reject(`Could not load file '${jsonFile}': ${JSON.stringify(res)}`);
        });
    });
  }

  getUserDetails(userId: string) {
    return this.users().filter((item) => item.Id == userId);
  }
}
