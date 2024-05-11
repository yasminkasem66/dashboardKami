import { Component, OnInit, inject } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { AsyncPipe, JsonPipe, NgIf, SlicePipe } from '@angular/common';
import { ITableHeaders } from '../../../../shared/models/itable-headers';
import { IActionTable } from '../../../../shared/models/iactiont-table';
import { IPost } from '../../models/ipost';
import { SearchComponent } from '../../../../shared/components/search/search.component';
import { NoDataFoundComponent } from '../../../../shared/components/no-data-found/no-data-found.component';
import { AbstractComponent } from '../../../abstract/abstract/abstract';
import { AddEditPostComponent } from '../add-edit-post/add-edit-post.component';
import { ActionType } from '../../enums/action-type';

@Component({
  selector: 'dash-list-of-posts',
  standalone: true,
  imports: [TableComponent, AsyncPipe, JsonPipe, NgIf, SearchComponent, NoDataFoundComponent, AddEditPostComponent],
  providers: [SlicePipe],
  templateUrl: './list-of-posts.component.html',
  styleUrl: './list-of-posts.component.scss',
})
export class ListOfPostsComponent extends AbstractComponent implements OnInit {
  private postService = inject(PostsService);
  private slicePipe = inject(SlicePipe);

  post!: IPost;
  posts: IPost[] = [];
  data: IPost[] = [];
  paginatedData: IPost[] = [];
  protected override pageSize: number = 5;
  openEditModal: boolean = false;
  openAddModal: boolean = false;
  actionType: typeof ActionType = ActionType;

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
      callback: (item) => {
        this.openEditModal = true;
        this.post = item;
      },
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
    this.getFilteredData(this.searchTerm);
  }

  getPosts() {
    this.postService.getListOfPosts().subscribe({
      next: (data) => {
        this.data = data;
        this.posts = this.data;
        this.paginatedData = this.getPage(this.posts);
      },
    });
  }

  deletePost(id: string) {
    this.postService.deletePost(id).subscribe({
      next: () => {
        this.posts = this.posts.filter((item) => item.id !== id);
        this.paginatedData = this.updatePaginatedData(this.posts);
      },
    });
  }

  pageNumberChange(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.paginatedData = this.getPage(this.posts);
  }

  getFilteredData(searchTerm: string) {
    this.posts = this.filteredItems(searchTerm, '/posts', this.data);
    this.paginatedData = this.updatePaginatedData(this.posts);
  }

  getSortedData(sortTerm: string) {
    this.posts = this.sortedItems(sortTerm, this.data);
    this.paginatedData = this.updatePaginatedData(this.posts);
  }

  openAddPostModal() {
    this.openAddModal = true;
  }

  addPost(event: any) {
    this.posts.unshift(event);
    this.paginatedData = this.updatePaginatedData(this.posts);
  }

  editPost(item: IPost) {
    item.id = this.post.id;
    const postIndex = this.posts.findIndex((post) => post.id == this.post.id);
    if (postIndex !== -1) {
      this.posts[postIndex] = { ...this.posts[postIndex], ...item };
      this.paginatedData = this.updatePaginatedData(this.posts);
      return this.posts;
    }
    return this.posts;

    this.paginatedData = this.updatePaginatedData(this.posts);
  }
}
