import { Component, OnInit, inject } from '@angular/core';
import { IActionTable } from '../../../../shared/models/iactiont-table';
import { ITableHeaders } from '../../../../shared/models/itable-headers';
import { AlbumsService } from '../../services/albums.service';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NoDataFoundComponent } from '../../../../shared/components/no-data-found/no-data-found.component';
import { SearchComponent } from '../../../../shared/components/search/search.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { IAlbum } from '../../models/ialbum';
import { AbstractComponent } from '../../../abstract/abstract/abstract';
@Component({
  selector: 'dash-list-of-albums',
  standalone: true,
  imports: [TableComponent, AsyncPipe, JsonPipe, NgIf, SearchComponent, RouterModule, NoDataFoundComponent],
  templateUrl: './list-of-albums.component.html',
  styleUrl: './list-of-albums.component.scss',
})
export class ListOfAlbumsComponent extends AbstractComponent implements OnInit {
  private albumsService = inject(AlbumsService);
  protected override pageSize: number = 10;

  albums: IAlbum[] = [];
  data: IAlbum[] = [];
  paginatedData: IAlbum[] = [];
  protected readonly Math = Math;

  actions: IActionTable[] = [
    {
      name: 'See more',
      label: 'See more',
      icon: 'pi-info-circle',
      iconClasses: ' cursor-pointer',
      callback: (photo) => {
        this.router.navigate(['photos-details'], { state: { photo } });
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
      callback: (photo) => {
        this.deletePhoto(photo.id);
      },
    },
  ];

  headers: ITableHeaders[] = [
    {
      value: 'title',
      name: 'Title',
    },
  ];

  ngOnInit(): void {
    this.getAlbums();
    this.setSearchTermOnInit();
    this.getFilteredData(this.searchTerm);
  }

  getAlbums() {
    this.albumsService.getListOfAlbums().subscribe({
      next: (data) => {
        this.data = data;
        this.albums = this.data;
        this.paginatedData = this.getPage(this.albums);
      },
    });
  }

  deletePhoto(id: string) {
    this.albumsService.deleteAlbum(id).subscribe({
      next: () => {
        this.albums = this.albums.filter((item) => item.id !== id);
        this.paginatedData = this.updatePaginatedData(this.albums);
      },
    });
  }

  pageNumberChange(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.paginatedData = this.getPage(this.albums);
  }

  getFilteredData(searchTerm: string) {
    this.albums = this.filteredItems(searchTerm, '/albums', this.data);
    this.paginatedData = this.updatePaginatedData(this.albums);
  }

  getSortedData(sortTerm: string) {
    this.albums = this.sortedItems(sortTerm, this.data);
    this.paginatedData = this.updatePaginatedData(this.albums);
  }
}
