export const API_URL = 'https://jsonplaceholder.typicode.com/';

export const ServicesUrls = {
  // post
  PAGINATED_LIST_OF_POSTS: 'posts?_page={pageNumber}&_per_page={pageSize}',
  LIST_OF_POSTS: 'posts',
  DELETE_POST: 'posts/',

  //album
  LIST_OF_ALBUMS: 'albums',
  DELETE_ALBUM: 'albums/',

  //photos
  LIST_OF_PHOTOS: 'photos',
  DELETE_PHOTO: 'photos/',
};
