import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BackButtonComponent } from '../../../../shared/components/back-button/back-button.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { NoDataFoundComponent } from '../../../../shared/components/no-data-found/no-data-found.component';
import { IPhoto } from '../../models/iphotos';

@Component({
  selector: 'dash-photo-details',
  standalone: true,
  imports: [RouterModule, CardComponent, NgIf, NoDataFoundComponent, BackButtonComponent],
  templateUrl: './photo-details.component.html',
  styleUrl: './photo-details.component.scss',
})
export class PhotoDetailsComponent {
  photo!: IPhoto;
  protected readonly history = history;

  ngOnInit(): void {
    this.photo = history.state.photo;
  }
}
