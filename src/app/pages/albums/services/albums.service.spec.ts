/* eslint-disable */
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { API_URL, ServicesUrls } from '../../../@Core/services/api-urls/api-urls';
import { AlbumsService } from './albums.service';

describe('albumsService', () => {
  let service: AlbumsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlbumsService, provideHttpClientTesting()],
    });
    service = TestBed.inject(AlbumsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve list of ALBUMS', () => {
    service.getListOfAlbums().subscribe((ALBUMS) => {
      expect(ALBUMS.length).toBe(100);
    });

    const req = httpMock.expectOne(`${API_URL}${ServicesUrls.LIST_OF_ALBUMS}`);
    expect(req.request.method).toBe('GET');
  });

  it('should retrieve albums by user id', () => {
    const userId = 1;

    service.getAlbumsByUserId(userId).subscribe((ALBUM) => {
      expect(ALBUM.length).toBe(10);
    });

    const req = httpMock.expectOne(
      `${API_URL}${ServicesUrls.ALBUMS_BY_USER_ID.replace('{userId}', userId.toString())}`,
    );
    expect(req.request.method).toBe('GET');
  });

  it('should delete a album', () => {
    const albumId = '1';

    service.deleteAlbum(albumId).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${API_URL}${ServicesUrls.DELETE_ALBUM}${albumId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
