import { CommonModule, AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TitleBoxComponent } from '../../shared/components/title-box/title-box.component';
import { IAlbum } from '../albums/models/ialbum';
import { AlbumsService } from '../albums/services/albums.service';
import { IPost } from '../posts/models/ipost';
import { PostsService } from '../posts/services/posts.service';
import { IUser } from '../users/models/iuser';
import { PhotosService } from '../photos/services/photos.service';
import { IPhoto } from '../photos/models/iphotos';
import { WidgetComponent } from '../../shared/components/widget/widget.component';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'dash-dashboard',
  standalone: true,
  imports: [CommonModule, TitleBoxComponent, AsyncPipe, WidgetComponent, CardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private albumService = inject(AlbumsService);
  private postService = inject(PostsService);
  private photosService = inject(PhotosService);

  user!: IUser;
  posts$!: Observable<IPost[]>;
  albums$!: Observable<IAlbum[]>;
  photos$!: Observable<IPhoto[]>;

  ngOnInit(): void {
    this.getStatistics();
  }

  getStatistics() {
    this.posts$ = this.postService.getPostsByUserId(1);
    this.albums$ = this.albumService.getAlbumsByUserId(1);
    this.photos$ = this.photosService.getPhotosByAlbumId(1);
  }
}
