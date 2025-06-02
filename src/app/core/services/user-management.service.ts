import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Subject, tap } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  private userDetailSubject = new Subject<User>();
  private usersLength = new BehaviorSubject<number>(0);

  public get users$() {
    return this.usersSubject.asObservable();
  }
    public get userById$() {
    return this.userDetailSubject.asObservable();
  }
  public get usersLength$() {
    return this.usersLength.asObservable();
  }

  constructor(private readonly http: HttpClient,
    private router:Router
  ) {}

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
   getUserById(id:number) {
    // https://www.melivecode.com/api/users/1
    this.http
      .get(
        `https://www.melivecode.com/api/users/${id}`
      )
      
      .subscribe((res:any) => {
        // console.log(data);

        this.userDetailSubject.next(res.user);
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
   createUser(user:User) {
    // https://www.melivecode.com/api/users/create

        this.http
      .post(
        `https://www.melivecode.com/api/users/create`
      ,{...user})
      .pipe()
      .subscribe((data) => {
        this.router.navigate(['/users']);
      //  this.getUsers();
      });
  }
   updateUser(user:User) {
    // https://www.melivecode.com/api/users/update

        this.http
      .put(
        `https://www.melivecode.com/api/users/update`
      ,{...user})
      .pipe()
      .subscribe((data) => {
        this.router.navigate(['/users']);
      //  this.getUsers();
      });
  }
  deleteUser(id:number){
    //https://www.melivecode.com/api/users/delete
 return   this.http.delete('https://www.melivecode.com/api/users/delete',{body:{id}})
    .pipe(tap(()=> {
      // this.getUsers();
    }));
  }
}
