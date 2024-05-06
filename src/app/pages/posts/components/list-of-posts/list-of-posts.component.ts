import { Component, OnInit, inject } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { AsyncPipe, JsonPipe, NgIf, SlicePipe } from '@angular/common';
import { ITableHeaders } from '../../../../shared/models/itable-headers';
import { IActionTable } from '../../../../shared/models/iactiont-table';
import { IPost } from '../../models/ipost';
import { SearchComponent } from '../../../../shared/components/search/search.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NoDataFoundComponent } from '../../../../shared/components/no-data-found/no-data-found.component';

@Component({
  selector: 'dash-list-of-posts',
  standalone: true,
  imports: [TableComponent, AsyncPipe, JsonPipe, NgIf, SearchComponent, RouterModule, NoDataFoundComponent],
  providers: [SlicePipe],
  templateUrl: './list-of-posts.component.html',
  styleUrl: './list-of-posts.component.scss',
})
export class ListOfPostsComponent implements OnInit {
  private postService = inject(PostsService);
  private slicePipe = inject(SlicePipe);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  pageNumber = 1;
  pageSize = 5;
  searchTerm: string = '';
  posts: IPost[] = [];
  data: IPost[] = [];
  paginatedData: IPost[] = [];

  headers: ITableHeaders[] = [
    {
      value: 'title',
      name: 'Title',
      renderedValue: (value) => {
        return this.slicePipe.transform(value, 0, 100);
      },
    },
    {
      value: 'body',
      name: 'Content',
      renderedValue: (value) => {
        return `${this.slicePipe.transform(value, 0, 100)}...`;
      },
    },
  ];

  actions: IActionTable[] = [
    {
      name: 'See more',
      label: 'See more',
      icon: 'pi-info-circle',
      iconClasses: ' cursor-pointer',
      callback: (post: IPost) => {
        this.router.navigate(['posts-details'], { state: { post } });
      },
    },
    {
      name: 'Edit',
      label: 'Edit',
      icon: 'pi-pen-to-square',
      iconClasses: ' cursor-pointer',
      // eslint-disable-next-line
      callback: (item) => {},
    },
    {
      name: 'Delete',
      label: 'Delete',
      icon: 'pi-trash',
      iconClasses: ' cursor-pointer',
      callback: (post) => {
        this.deletePost(post.id);
      },
    },
  ];

  ngOnInit(): void {
    this.getPosts();
    this.setSearchTermOnInit();
    this.filteredItems(this.searchTerm);
  }

  private setSearchTermOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['searchTerm'] || '';
    });
  }

  getPosts() {
    this.postService.getListOfPosts().subscribe({
      next: (data) => {
        this.data = data;
        this.posts = this.data;
        this.getPage();
      },
      error: () => {},
    });
  }

  deletePost(id: string) {
    this.postService.deletePost(id).subscribe({
      next: () => {
        this.posts = this.posts.filter((item) => item.id !== id);
        this.paginatedData = this.posts.slice(0, this.pageSize);
      },
      error: () => {},
    });
  }

  getPage() {
    const startIndex = (this.pageNumber - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.posts.length);
    this.paginatedData = this.posts.slice(startIndex, endIndex);
  }

  filteredItems(searchTerm: string) {
    this.router.navigate(['/posts'], {
      relativeTo: this.route,
      queryParams: { searchTerm: searchTerm },
      queryParamsHandling: 'merge', // Preserve existing query parameters
    });

    this.posts = this.data.filter((item) => item.title.toLowerCase().includes(searchTerm));
    this.paginatedData = this.posts.slice(0, this.pageSize);
  }

  sortedItems(sortTerm: string) {
    if (sortTerm === 'asc') {
      this.posts = this.data.slice().sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    } else if (sortTerm === 'desc') {
      this.posts = this.data.slice().sort((a, b) => {
        return b.title.localeCompare(a.title);
      });
    }

    // Update paginatedData with sorted posts
    this.paginatedData = this.posts.slice(0, this.pageSize);
  }
}
