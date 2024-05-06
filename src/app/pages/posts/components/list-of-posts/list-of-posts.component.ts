import { Component, OnInit, inject } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { AsyncPipe, JsonPipe, NgIf, SlicePipe } from '@angular/common';
import { ITableHeaders } from '../../../../shared/models/itable-headers';
import { IActionTable } from '../../../../shared/models/iactiont-table';
import { IPost } from '../../models/ipost';
import { SearchComponent } from '../../../../shared/components/search/search.component';

@Component({
  selector: 'dash-list-of-posts',
  standalone: true,
  imports: [TableComponent, AsyncPipe, JsonPipe, NgIf, SearchComponent],
  providers: [SlicePipe],
  templateUrl: './list-of-posts.component.html',
  styleUrl: './list-of-posts.component.scss',
})
export class ListOfPostsComponent implements OnInit {
  private postService = inject(PostsService);
  private slicePipe = inject(SlicePipe);

  pageNumber = 1;
  pageSize = 5;
  posts: IPost[] = [];
  data: IPost[] = [];
  paginatedData: IPost[] = [];

  headers: ITableHeaders[] = [
    {
      value: 'title',
      name: 'POST.TITLE',
      renderedValue: (value) => {
        return this.slicePipe.transform(value, 0, 100);
      },
    },
    {
      value: 'body',
      name: 'POST.BODY',
      renderedValue: (value) => {
        return this.slicePipe.transform(value, 0, 100);
      },
    },
  ];

  actions: IActionTable[] = [
    {
      name: 'See more',
      label: 'See more',
      icon: 'string',
      iconClasses: 'string',
      callback: () => {},
    },
    {
      name: 'Edit',
      label: 'Edit',
      icon: 'string',
      iconClasses: 'string',
      callback: () => {},
    },
    {
      name: 'Delete',
      label: 'Delete',
      icon: 'string',
      iconClasses: 'string',
      callback: () => {},
    },
  ];

  ngOnInit(): void {
    this.getPosts();
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

  getPage() {
    const startIndex = (this.pageNumber - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.posts.length);
    this.paginatedData = this.posts.slice(startIndex, endIndex);
  }

  filteredItems(searchTerm: string) {
    this.posts = this.data.filter((item) => item.title.toLowerCase().includes(searchTerm));
  }
}
