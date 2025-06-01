import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  private usersLength = new BehaviorSubject<number>(0);

  public get users$() {
    return this.usersSubject.asObservable();
  }
  public get usersLength$() {
    return this.usersLength.asObservable();
  }

  constructor(private readonly http: HttpClient) {}

  getUsers(page: number = 1, per_page: number = 10) {
    // https://www.melivecode.com/api/users?page=1&per_page=10
    this.http
      .get(
        `https://www.melivecode.com/api/users?page=${page}&per_page=${per_page}`
      )
      .pipe(
        map((res: any) => {
          this.usersLength.next(res.total);

          return res.data;
        })
      )
      .subscribe((data) => {
        console.log(data);

        this.usersSubject.next(data);
      });
  }
  searchUsers(searchWord: string, page: number = 1, per_page: number = 10) {
    // https://www.melivecode.com/api/users?search=ka&page=1&per_page=10&sort_column=id
    this.http
      .get(
        `https://www.melivecode.com/api/users?search=${searchWord}&page=${page}&per_page=${per_page}`
      )
      .pipe(
        map((res: any) => {
          this.usersLength.next(res.total);

          return res.data;
        })
      )
      .subscribe((data) => {
        console.log(data);

        this.usersSubject.next(data);
      });
  }
  sortUsersBy(sort_order:string,sort_column:string,searchWord:string='', page: number = 1, per_page: number = 10) {
    // https://www.melivecode.com/api/users?search=ka&page=1&per_page=10&sort_column=id&sort_order=desc

        this.http
      .get(
        `https://www.melivecode.com/api/users?search=${searchWord}&page=${page}&per_page=${per_page}&sort_column=${sort_column}&sort_order=${sort_order}`
      )
      .pipe(
        map((res: any) => {
          this.usersLength.next(res.total);

          return res.data;
        })
      )
      .subscribe((data) => {

        this.usersSubject.next(data);
      });
  }
}
