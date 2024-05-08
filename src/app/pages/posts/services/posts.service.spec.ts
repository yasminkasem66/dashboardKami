/* eslint-disable */
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PostsService } from './posts.service';
import { API_URL, ServicesUrls } from '../../../@Core/services/api-urls/api-urls';

describe('PostsService', () => {
  let service: PostsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostsService, provideHttpClientTesting()],
    });
    service = TestBed.inject(PostsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve paginated list of posts', () => {
    const pageNumber = 1;
    const pageSize = 10;

    service.getPaginatedListOfPosts(pageNumber, pageSize).subscribe((posts) => {
      expect(posts.length).toBe(10);
    });

    const req = httpMock.expectOne(
      `${API_URL}${ServicesUrls.PAGINATED_LIST_OF_POSTS.replace('{pageNumber}', pageNumber.toString()).replace('{pageSize}', pageSize.toString())}`,
    );
    expect(req.request.method).toBe('GET');
  });

  it('should retrieve list of posts', () => {
    service.getListOfPosts().subscribe((posts) => {
      expect(posts.length).toBe(100);
    });

    const req = httpMock.expectOne(`${API_URL}${ServicesUrls.LIST_OF_POSTS}`);
    expect(req.request.method).toBe('GET');
  });

  it('should retrieve posts by user id', () => {
    const userId = 1;

    service.getPostsByUserId(userId).subscribe((posts) => {
      expect(posts.length).toBe(10);
    });

    const req = httpMock.expectOne(`${API_URL}${ServicesUrls.POSTS_BY_USER_ID.replace('{userId}', userId.toString())}`);
    expect(req.request.method).toBe('GET');
  });

  it('should delete a post', () => {
    const postId = '1';

    service.deletePost(postId).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${API_URL}${ServicesUrls.DELETE_POST}${postId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
