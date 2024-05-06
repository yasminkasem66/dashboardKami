import { Component, inject } from '@angular/core';
import { IActionTable } from '../../../../shared/models/iactiont-table';
import { ITableHeaders } from '../../../../shared/models/itable-headers';
import { AlbumsService } from '../../services/albums.service';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NoDataFoundComponent } from '../../../../shared/components/no-data-found/no-data-found.component';
import { SearchComponent } from '../../../../shared/components/search/search.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { IAlbum } from '../../models/ialbum';
@Component({
  selector: 'dash-list-of-albums',
  standalone: true,
  imports: [TableComponent, AsyncPipe, JsonPipe, NgIf, SearchComponent, RouterModule, NoDataFoundComponent],
  templateUrl: './list-of-albums.component.html',
  styleUrl: './list-of-albums.component.scss',
})
export class ListOfAlbumsComponent {
  private albumService = inject(AlbumsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  pageNumber = 1;
  pageSize = 5;
  searchTerm: string = '';
  albums: IAlbum[] = [];
  data: IAlbum[] = [];
  paginatedData: IAlbum[] = [];

  headers: ITableHeaders[] = [
    {
      value: 'title',
      name: 'Title',
    },
  ];

  actions: IActionTable[] = [
    {
      name: 'See more',
      label: 'See more',
      icon: 'pi-info-circle',
      iconClasses: ' cursor-pointer',
      callback: (album) => {
        this.router.navigate(['album-details'], { state: { album } });
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
        this.deleteAlbum(post.id);
      },
    },
  ];

  ngOnInit(): void {
    this.getAlbums();
    this.setSearchTermOnInit();
    this.filteredItems(this.searchTerm);
  }

  private setSearchTermOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['searchTerm'] || '';
    });
  }

  getAlbums() {
    this.albumService.getListOfAlbums().subscribe({
      next: (data) => {
        this.data = data;
        this.albums = this.data;
        this.getPage();
      },
      error: () => {},
    });
  }

  deleteAlbum(id: string) {
    this.albumService.deleteAlbum(id).subscribe({
      next: () => {
        this.albums = this.albums.filter((item) => item.id !== id);
        this.updatePaginatedData();
      },
      error: () => {},
    });
  }

  getPage() {
    const startIndex = (this.pageNumber - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.albums.length);
    this.paginatedData = this.albums.slice(startIndex, endIndex);
  }

  filteredItems(searchTerm: string) {
    this.router.navigate(['/albums'], {
      relativeTo: this.route,
      queryParams: { searchTerm: searchTerm },
      queryParamsHandling: 'merge',
    });

    this.albums = this.data.filter((item) => item.title.toLowerCase().includes(searchTerm));
    this.updatePaginatedData();
  }

  sortedItems(sortTerm: string) {
    if (sortTerm === 'asc') {
      this.albums = this.data.slice().sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    } else if (sortTerm === 'desc') {
      this.albums = this.data.slice().sort((a, b) => {
        return b.title.localeCompare(a.title);
      });
    }

    this.updatePaginatedData();
  }

  private updatePaginatedData() {
    this.paginatedData = this.albums.slice(0, this.pageSize);
  }
}
