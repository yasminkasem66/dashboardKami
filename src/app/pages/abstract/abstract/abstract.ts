import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export abstract class AbstractComponent {
  protected route = inject(ActivatedRoute);
  protected router = inject(Router);

  protected pageNumber = 1;
  protected abstract pageSize: number;
  protected searchTerm: string = '';

  protected setSearchTermOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['searchTerm'] || '';
    });
  }

  protected getPage(data: any[]) {
    const startIndex = (this.pageNumber - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, data.length);
    const paginatedData = data.slice(startIndex, endIndex);
    return paginatedData;
  }

  protected filteredItems(searchTerm: string, route: string, data: any[]) {
    this.router.navigate([route], {
      relativeTo: this.route,
      queryParams: { searchTerm: searchTerm },
      queryParamsHandling: 'merge',
    });

    return data.filter((item) => item.title.toLowerCase().includes(searchTerm));
  }

  protected sortedItems(sortTerm: string, data: any[]) {
    if (sortTerm === 'asc') {
      return data.slice().sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    } else if (sortTerm === 'desc') {
      return data.slice().sort((a, b) => {
        return b.title.localeCompare(a.title);
      });
    }

    return [];
  }

  protected updatePaginatedData(data: any[]) {
    return data.slice(0, this.pageSize);
  }
}
