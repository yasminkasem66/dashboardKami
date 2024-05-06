import { Component } from '@angular/core';
import { IAlbum } from '../../models/ialbum';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BackButtonComponent } from '../../../../shared/components/back-button/back-button.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { NoDataFoundComponent } from '../../../../shared/components/no-data-found/no-data-found.component';

@Component({
  selector: 'dash-album-details',
  standalone: true,
  imports: [RouterModule, CardComponent, NgIf, NoDataFoundComponent, BackButtonComponent],
  templateUrl: './album-details.component.html',
  styleUrl: './album-details.component.scss',
})
export class AlbumDetailsComponent {
  album!: IAlbum;

  ngOnInit(): void {
    this.album = history.state.album;
  }
}
