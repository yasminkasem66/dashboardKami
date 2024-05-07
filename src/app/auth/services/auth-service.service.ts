import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin } from '../models/iuser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);

  private baseUrl = 'http://localhost:3000/users';

  login(): Observable<ILogin[]> {
    return this.httpClient.get<ILogin[]>(this.baseUrl);
  }

  signup(user: ILogin): Observable<null> {
    return this.httpClient.post<null>(this.baseUrl, user);
  }
}
