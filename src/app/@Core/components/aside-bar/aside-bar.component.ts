import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from '../../models/menu-item';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  standalone: true,
  selector: 'dash-aside-bar',
  imports: [CommonModule, RouterModule, ModalComponent],
  templateUrl: './aside-bar.component.html',
  styleUrls: ['./aside-bar.component.scss'],
})
export class AsideBarComponent {
  router = inject(Router);

  openLogoutModel: boolean = false;
  selectedIndexSubMenu!: number;
  selectedIndex!: number;

  navList: MenuItem[] = [
    {
      title: 'DASHBOARD',
      route: 'dashboard',
      icon: 'pi-microsoft',
      navigationItems: [],
    },
    {
      title: 'POSTS',
      route: '/posts',
      icon: 'pi-book',
      navigationItems: [],
    },
    {
      title: 'PHOTOS',
      route: 'photos',
      icon: 'pi-images',
    },
    {
      title: 'ALBUMS',
      route: 'albums',
      icon: 'pi-file-o',
    },
  ];

  setActiveLink(index: number) {
    this.selectedIndex = this.selectedIndex === index ? -1 : index;
  }

  setSubActiveLink(index: number) {
    this.selectedIndexSubMenu = index;
  }

  openLogout() {
    this.openLogoutModel = true;
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
