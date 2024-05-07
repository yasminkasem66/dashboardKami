import { Component, OnInit, inject } from '@angular/core';
import { AbstractComponent } from '../../../abstract/abstract/abstract';
import { PhotosService } from '../../services/photos.service';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { IPhoto } from '../../models/iphotos';
import { NoDataFoundComponent } from '../../../../shared/components/no-data-found/no-data-found.component';
import { SearchComponent } from '../../../../shared/components/search/search.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { IActionTable } from '../../../../shared/models/iactiont-table';

@Component({
  selector: 'dash-list-of-photos',
  standalone: true,
  imports: [
    TableComponent,
    AsyncPipe,
    JsonPipe,
    NgIf,
    SearchComponent,
    NoDataFoundComponent,
    CardComponent,
    PaginationComponent,
  ],
  templateUrl: './list-of-photos.component.html',
  styleUrl: './list-of-photos.component.scss',
})
export class ListOfPhotosComponent extends AbstractComponent implements OnInit {
  private photoService = inject(PhotosService);
  protected override pageSize: number = 20;

  photos: IPhoto[] = [];
  data: IPhoto[] = [];
  paginatedData: IPhoto[] = [];
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

  ngOnInit(): void {
    this.getPhotos();
    this.setSearchTermOnInit();
    this.getFilteredData(this.searchTerm);
  }

  getPhotos() {
    this.photoService.getListOfPhotos().subscribe({
      next: (data) => {
        this.data = data.splice(0, 200);
        this.photos = this.data;
        this.paginatedData = this.getPage(this.photos);
      },
    });
  }

  deletePhoto(id: string) {
    this.photoService.deletePhoto(id).subscribe({
      next: () => {
        this.photos = this.photos.filter((item) => item.id !== id);
        this.paginatedData = this.updatePaginatedData(this.photos);
      },
    });
  }

  pageNumberChange(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.paginatedData = this.getPage(this.photos);
  }

  getFilteredData(searchTerm: string) {
    this.photos = this.filteredItems(searchTerm, '/photos', this.data);
    this.paginatedData = this.updatePaginatedData(this.photos);
  }

  getSortedData(sortTerm: string) {
    this.photos = this.sortedItems(sortTerm, this.data);
    this.paginatedData = this.updatePaginatedData(this.photos);
  }
}
