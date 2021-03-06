import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService  {
  public token: string;
  public user;

  constructor(private http: Http) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  signUp(firstName: string, lastName: string, email: string, username: string, pass: string): Observable<boolean> {
    const url = 'https://multipass-auth.herokuapp.com/services/auth/signup';
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const opts = new RequestOptions({ headers: headers });
    const data = JSON.stringify({ firstName, lastName, email, nickname: username, pass });

    return this.http.post(url, data, opts)
      .map((res: Response) => {
        const { token } = res.json();

        if (token) {
          return true;
        }

        return false;
      });
  }

  login(nickname: string, pass: string): Observable<boolean> {
    const url = 'https://multipass-auth.herokuapp.com/services/auth/login';
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const opts = new RequestOptions({ headers: headers });
    const data = JSON.stringify({ nickname, pass });

    return this.http.post(url, data, opts)
      .map((res: Response) => {
        const { user, token } = res.json();

        if (token) {
          this.token = token;
          this.user = user;

          localStorage.setItem('currentUser', JSON.stringify({ nickname: user.nickname, token }));

          return true;
        }

        return false;
      });
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
  }
}
