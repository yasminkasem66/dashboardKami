import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'dash-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  private router = inject(Router);

  userName: string = 'USER';
  selectedValue: string = 'Farm';
  idOfCommodityLicense: string = '';

  reloadComponent() {
    this.router.navigateByUrl('/sales', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']);
    });
  }
}
