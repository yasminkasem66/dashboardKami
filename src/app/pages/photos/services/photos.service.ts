import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, ServicesUrls } from '../../../@Core/services/api-urls';
import { IPhoto } from '../models/iphotos';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  private httpClient = inject(HttpClient);

  getListOfPhotos(): Observable<IPhoto[]> {
    const ApiUrl = `${API_URL}${ServicesUrls.LIST_OF_PHOTOS}`;
    return this.httpClient.get<IPhoto[]>(ApiUrl);
  }

  deletePhoto(id: string): Observable<null> {
    const ApiUrl = `${API_URL}${ServicesUrls.DELETE_PHOTO}${id}`;
    return this.httpClient.delete<null>(ApiUrl);
  }
}
