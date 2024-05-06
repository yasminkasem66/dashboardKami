import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ITableHeaders } from '../../models/itable-headers';
import { IActionTable } from '../../models/iactiont-table';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'dash-table',
  standalone: true,
  imports: [CommonModule, TranslateModule, PaginationComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges {
  private cdr = inject(ChangeDetectorRef);

  @Input({ required: true }) tableData!: { [key: string | number]: any }[];
  @Input({ required: true }) headers!: ITableHeaders[];
  @Input() showPagination: boolean = true;
  @Input() alignRight: boolean = false;
  @Input() customClass: string = '';
  @Input() actions?: IActionTable[];
  @Input() totalCount!: number;
  @Input() pageSize: number = 5;

  @Output() pageNumberChange: EventEmitter<number> = new EventEmitter<number>();
  protected readonly Math = Math;

  ngOnChanges(): void {
    this.cdr.detectChanges();
  }

  getRowValueFromHeader(header: ITableHeaders, item: any) {
    if (header.renderedValue) return header.renderedValue(item[header.value]);
    return item[header.value];
  }
}
