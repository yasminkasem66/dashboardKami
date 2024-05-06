import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, ServicesUrls } from '../../../@Core/services/api-urls';
import { IAlbum } from '../models/ialbum';

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  private httpClient = inject(HttpClient);

  getListOfAlbums(): Observable<IAlbum[]> {
    const ApiUrl = `${API_URL}${ServicesUrls.LIST_OF_ALBUMS}`;
    return this.httpClient.get<IAlbum[]>(ApiUrl);
  }

  deleteAlbum(id: string): Observable<null> {
    const ApiUrl = `${API_URL}${ServicesUrls.DELETE_ALBUM}${id}`;
    return this.httpClient.delete<null>(ApiUrl);
  }
}
