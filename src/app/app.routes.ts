import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then((c) => c.DashboardComponent),
    pathMatch: 'full',
  },
  {
    path: 'posts',
    loadComponent: () =>
      import('./pages/posts/components/list-of-posts/list-of-posts.component').then((c) => c.ListOfPostsComponent),
  },
  {
    path: 'albums',
    loadComponent: () =>
      import('./pages/albums/components/list-of-albums/list-of-albums.component').then((c) => c.ListOfAlbumsComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
