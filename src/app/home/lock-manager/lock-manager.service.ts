import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class LockManagerService {

  constructor(private http: Http) { }

  getUserKeys(owner: string): Observable<any> {
    const url = `https://multipass-db.herokuapp.com/api/keys/${owner}`;

    return this.http.get(url)
      .map(res => res.json())
      .map(data => data.map(item => item && item.value))
  }

  getUserLocks(owner: string): Observable<any> {
    const url = `https://multipass-db.herokuapp.com/api/locks/${owner}`;

    return this.http.get(url)
      .map(res => res.json())
      .map(data => data.map(item => item && item.value))
  }

  deleteLock(owner: string, id: string): Observable<any> {
    const url = `https://multipass-db.herokuapp.com/api/locks/`;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const data = { owner, id };
    const opts = new RequestOptions({
      headers: headers,
      body: data
    });

    return this.http.delete(url, opts)
      .map(res => res.json());
  }

  addLock(owner: string, id: string, description: string, trusted: Array<string>): Observable<any> {
    const url = `https://multipass-db.herokuapp.com/api/locks/`;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const opts = new RequestOptions({ headers: headers });
    const data = JSON.stringify({ owner, id, description, trusted });

    return this.http.post(url, data, opts)
      .map(res => res.json());
  }
}
