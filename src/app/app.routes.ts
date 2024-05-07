import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guard/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/components/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () => import('./auth/components/sign-up/sign-up.component').then((c) => c.SignUpComponent),
  },
  {
    path: '',
    loadComponent: () => import('./pages/main/main.component').then((c) => c.MainComponent),
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadComponent: () => import('./pages/dashboard/dashboard.component').then((c) => c.DashboardComponent),
      },
      {
        path: 'posts',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./pages/posts/components/list-of-posts/list-of-posts.component').then((c) => c.ListOfPostsComponent),
        title: 'POSTS',
      },
      {
        path: 'posts-details',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./pages/posts/components/post-details/post-details.component').then((c) => c.PostDetailsComponent),
        title: 'POST DETAILS',
      },
      {
        path: 'albums',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./pages/albums/components/list-of-albums/list-of-albums.component').then(
            (c) => c.ListOfAlbumsComponent,
          ),
        title: 'ALBUMS',
      },
      {
        path: 'album-details',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./pages/albums/components/album-details/album-details.component').then(
            (c) => c.AlbumDetailsComponent,
          ),
        title: 'ALBUMS DETAILS',
      },
      {
        path: 'photos',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./pages/photos/components/list-of-photos/list-of-photos.component').then(
            (c) => c.ListOfPhotosComponent,
          ),
        title: 'PHOTO',
      },
      {
        path: 'photos-details',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./pages/photos/components/photo-details/photo-details.component').then(
            (c) => c.PhotoDetailsComponent,
          ),
        title: 'PHOTO DETAILS',
      },
      {
        path: 'user',
        canActivate: [AuthGuard],
        loadComponent: () => import('./pages/users/user/user.component').then((c) => c.UserComponent),
        title: 'USER',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
