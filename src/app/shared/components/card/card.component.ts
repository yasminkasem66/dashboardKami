import { CommonModule, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'dash-card',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() imageUrl?: string;
  @Input() imageAlt?: string;
  @Input() title?: string;
  @Input() description?: string;
  @Input() buttonText?: string;
  @Input() cardLinkText?: string;
}
