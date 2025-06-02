import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BehaviorSubject, Subject, Subscription, take, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject(false);
  private currentUser = new BehaviorSubject<User|null>(null);
  querySub!: Subscription;
  public get isAuthenticated$() {
    return this.isAuthenticated.asObservable();
  }
  public get currentUser$() {
    return this.currentUser.asObservable();
  }
  constructor(
    private readonly http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  login(username: string, password: string) {
    return this.http
      .post('https://www.melivecode.com/api/login', { username, password })
      .pipe(
        tap((res: any) => {
          this.currentUser.next(res.user);
          console.log(res.user);

          sessionStorage.setItem('accessToken', res.accessToken);
          this.isAuthenticated.next(true);
          this.route.queryParams.pipe(take(1)).subscribe((res: any) => {
            if (!res.returnUrl) this.router.navigateByUrl('attractions');
            else this.router.navigate([res.returnUrl]);
          });
        })
      );
  }
}
