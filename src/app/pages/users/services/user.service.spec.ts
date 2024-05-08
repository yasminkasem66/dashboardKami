/* eslint-disable */
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { API_URL, ServicesUrls } from '../../../@Core/services/api-urls/api-urls';
import { UserService } from './user.service';

describe('PostsService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService, provideHttpClientTesting()],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve posts by user id', () => {
    const userId = '1';

    service.getCurrentUser(userId).subscribe((posts) => {
      expect(posts.length).toBe(1);
    });

    const req = httpMock.expectOne(`${API_URL}${ServicesUrls.GET_CURRENT_USER}${userId}`);
    expect(req.request.method).toBe('GET');
  });
});
