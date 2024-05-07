import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, ServicesUrls } from '../../../@Core/services/api-urls/api-urls';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient = inject(HttpClient);

  getCurrentUser(id: string): Observable<any> {
    const ApiUrl = `${API_URL}${ServicesUrls.GET_CURRENT_USER}${id}`;
    return this.httpClient.get<any>(ApiUrl);
  }
}
