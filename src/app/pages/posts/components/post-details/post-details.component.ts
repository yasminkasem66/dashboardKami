import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { IPost } from '../../models/ipost';
import { NgIf } from '@angular/common';
import { NoDataFoundComponent } from '../../../../shared/components/no-data-found/no-data-found.component';
import { BackButtonComponent } from '../../../../shared/components/back-button/back-button.component';

@Component({
  selector: 'dash-post-details',
  standalone: true,
  imports: [RouterModule, CardComponent, NgIf, NoDataFoundComponent, BackButtonComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss',
})
export class PostDetailsComponent implements OnInit {
  post!: IPost;

  ngOnInit(): void {
    this.post = history.state.post;
  }
}
