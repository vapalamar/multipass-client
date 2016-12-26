import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService  {
  public token: string;

  constructor(private http: Http) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(user: string, pass: string): Observable<boolean> {
    const url = 'http://localhost:8080/services/auth/login';
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const opts = new RequestOptions({ headers: headers });
    const data = JSON.stringify({ email: user, pass });

    return this.http.post(url, data, opts)
      .map((res: Response) => {
        const { email, token } = res.json();

        if (token) {
          this.token = token;

          localStorage.setItem('currentUser', JSON.stringify({ email, token }));

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
