import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then((c) => c.DashboardComponent),
    pathMatch: 'full',
  },
  {
    path: 'posts',
    loadComponent: () =>
      import('./pages/posts/components/list-of-posts/list-of-posts.component').then((c) => c.ListOfPostsComponent),
    title: 'POSTS',
  },
  {
    path: 'posts-details',
    loadComponent: () =>
      import('./pages/posts/components/post-details/post-details.component').then((c) => c.PostDetailsComponent),
    title: 'POST DETAILS',
  },
  {
    path: 'albums',
    loadComponent: () =>
      import('./pages/albums/components/list-of-albums/list-of-albums.component').then((c) => c.ListOfAlbumsComponent),
    title: 'ALBUMS',
  },
  {
    path: 'album-details',
    loadComponent: () =>
      import('./pages/albums/components/album-details/album-details.component').then((c) => c.AlbumDetailsComponent),
    title: 'ALBUMS DETAILS',
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
