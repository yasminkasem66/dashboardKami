/* eslint-disable */
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PhotosService } from './photos.service';
import { API_URL, ServicesUrls } from '../../../@Core/services/api-urls/api-urls';

describe('PhotosService', () => {
  let service: PhotosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhotosService, provideHttpClientTesting()],
    });
    service = TestBed.inject(PhotosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return list of photos', () => {
    service.getListOfPhotos().subscribe((photos) => {
      expect(photos.length).toBe(4999);
    });

    const req = httpMock.expectOne(`${API_URL}${ServicesUrls.LIST_OF_PHOTOS}`);
    expect(req.request.method).toBe('GET');
  });

  it('should return photos by album ID', () => {
    const userId = 1;

    service.getPhotosByAlbumId(userId).subscribe((photos) => {
      expect(photos.length).toBe(9);
    });

    const req = httpMock.expectOne(
      `${API_URL}${ServicesUrls.PHOTOS_BY_ALBUM_ID.replace('{userId}', userId.toString())}`,
    );
    expect(req.request.method).toBe('GET');
  });

  it('should delete photo', () => {
    const photoId = '1';

    service.deletePhoto(photoId).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${API_URL}${ServicesUrls.DELETE_PHOTO}${photoId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
