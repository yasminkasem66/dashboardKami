import { inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, ServicesUrls } from '../../../@Core/services/api-urls/api-urls';
import { HttpClient } from '@angular/common/http';
import { IPost } from '../models/ipost';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private httpClient = inject(HttpClient);

  getPaginatedListOfPosts(pageNumber: number, pageSize: number): Observable<any[]> {
    const ApiUrl = `${API_URL}${ServicesUrls.PAGINATED_LIST_OF_POSTS.replace('{pageNumber}', pageNumber.toString()).replace('{pageSize}', pageSize.toString())}`;
    return this.httpClient.get<IPost[]>(ApiUrl);
  }
  getListOfPosts(): Observable<IPost[]> {
    const ApiUrl = `${API_URL}${ServicesUrls.LIST_OF_POSTS}`;
    return this.httpClient.get<IPost[]>(ApiUrl);
  }

  getPostsByUserId(userId: number): Observable<IPost[]> {
    const ApiUrl = `${API_URL}${ServicesUrls.POSTS_BY_USER_ID.replace('{userId}', userId.toString())}`;
    return this.httpClient.get<IPost[]>(ApiUrl);
  }

  deletePost(id: string): Observable<null> {
    const ApiUrl = `${API_URL}${ServicesUrls.DELETE_POST}${id}`;
    return this.httpClient.delete<null>(ApiUrl);
  }
}
