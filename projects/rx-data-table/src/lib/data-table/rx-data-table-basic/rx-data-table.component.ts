import { Component, ContentChild, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { PaginationStrategy } from '../models/pagination-strategy.enum';
import { Subscription, Observable } from 'rxjs';
import { clone } from '../shared/rx-data-table.utils';
import { DataTableStrategies } from '../models/data-table-strategy';

@Component({
  selector: 'rx-data-table-basic',
  templateUrl: './rx-data-table.component.html',

})
export class RxDataTableComponent implements OnInit, OnDestroy {
  // Templates
  @ContentChild('dataTableHeader') dataTableHeader: TemplateRef<any>;
  @ContentChild('dataTableRow') dataTableRow: TemplateRef<any>;

  // Inputs
  @Input() paginationStrategy = PaginationStrategy.NONE;
  @Input() dataSource: Observable<any>;
  @Input() descriptors: string[] = [];

  // Outputs
  @Output() rowSelection = new EventEmitter<any>();
  @Output() updatePagination = new EventEmitter<any>();

  _innerDataSource: any;
  paginationStrategies = PaginationStrategy;
  dataTableStrategy = DataTableStrategies.NORMAL;
  private subscription: Subscription;
  pager = {
    first: true,
    last: false,
    number: 0,
    numberOfElements: null,
    size: 5,
    sort: null,
    totalElements: 0,
    totalPages: 0,
    content: []
  };

  constructor() {
  }

  ngOnInit() {
    this.subscription = this.dataSource.subscribe((data) => {
      switch (this.paginationStrategy) {
        case PaginationStrategy.SERVICE:
          if (data && this.pager.number !== data.number) {
            data.number++;
            this.pager = data || this.pager;
          }
          this._innerDataSource = data.content;
          break;
        case PaginationStrategy.INTERNAL:
          this.pager.content = data || [];
          this.pager.number = 1;
          this.pager.totalElements = this.pager.content.length;
          this.pager.totalPages = (this.pager.totalElements / this.pager.size);
          if (this.pager.number === this.pager.totalPages) {
            this.pager.last = true;
          }
          this.onUpdatePagination(1);
          break;
        case PaginationStrategy.NONE:
          this._innerDataSource = data;
          break;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Events
  onRowSelection(row) {
    this.rowSelection.emit(row);
  }

  onUpdatePagination(page) {
    if (this.paginationStrategy === PaginationStrategy.SERVICE) {
      const pager = clone(this.pager);
      pager.number = page;
      this.updatePagination.emit(Object.assign({}, pager, {number: pager.number - 1}));
    } else if (this.paginationStrategy === PaginationStrategy.INTERNAL) {
      this.pager.number = page;
      this.pager.totalElements = this.pager.content.length;
      this.pager.totalPages = (this.pager.totalElements / this.pager.size);
      if (this.pager.number === 1) {
        this.pager.first = true;
      } else if (this.pager.number === this.pager.totalPages - 1) {
        this.pager.last = true;
      } else {
        this.pager.first = false;
        this.pager.last = false;
      }
      this._innerDataSource = this.pager.content.slice(
        (this.pager.number - 1) * this.pager.size,
        (this.pager.number) * this.pager.size
      );
    }
  }

  onUpdateSize() {
    this.onUpdatePagination(1);
  }
}
