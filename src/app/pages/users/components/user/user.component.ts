import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { TitleBoxComponent } from '../../../../shared/components/title-box/title-box.component';
import { IUser } from '../../models/iuser';
import { Observable } from 'rxjs';
import { IPost } from '../../../posts/models/ipost';
import { PostsService } from '../../../posts/services/posts.service';
import { AlbumsService } from '../../../albums/services/albums.service';
import { IAlbum } from '../../../albums/models/ialbum';

@Component({
  selector: 'dash-user',
  standalone: true,
  imports: [CommonModule, TitleBoxComponent, AsyncPipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  private albumService = inject(AlbumsService);
  private postService = inject(PostsService);
  private userService = inject(UserService);

  user!: IUser;
  posts$!: Observable<IPost[]>;
  albums$!: Observable<IAlbum[]>;

  ngOnInit(): void {
    this.getPhotos();
  }

  getPhotos() {
    this.userService.getCurrentUser('1').subscribe({
      next: (data) => {
        this.user = data;
        this.posts$ = this.postService.getPostsByUserId(this.user.id);
        this.albums$ = this.albumService.getAlbumsByUserId(this.user.id);
      },
    });
  }
}
