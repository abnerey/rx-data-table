import {Component, ContentChild, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef} from '@angular/core';
import {DataTableStrategies} from '../models/data-table-strategy';
import {PaginationStrategy} from '../models/pagination-strategy.enum';
import {Observable, Subscription} from 'rxjs';
import {clone} from '../shared/rx-data-table.utils';

@Component({
    selector: 'rx-data-table-group',
    templateUrl: './rx-data-table-group.component.html',
    styleUrls: ['./rx-data-table-group.component.css']
})
export class RxDataTableGroupComponent implements OnInit, OnDestroy {
    // Templates
    @ContentChild('dataTableRow') dataTableRow: TemplateRef<any>;
    @ContentChild('dataTableHeader') dataTableHeader: TemplateRef<any>;
    @ContentChild('dataTableGroup') dataTableGroup: TemplateRef<any>;

    // Inputs
    @Input() descriptors: string[] = [];
    @Input() dataSource: Observable<any>;
    @Input() paginationStrategy = PaginationStrategy.INTERNAL;

    // Output
    @Output() rowSelection = new EventEmitter<any>();
    @Output() groupSelection = new EventEmitter<any>();
    @Output() updatePagination = new EventEmitter<any>();

    _innerDataSource: any;
    dataTableStrategy = DataTableStrategies.GROUP;
    paginationStrategies = PaginationStrategy;
    private subscription: Subscription;
    pager = {
        first: true,
        last: false,
        number: 1,
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
        this.subscription =  this.dataSource.subscribe(data => {
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

    onGroupSelection(group) {
        this.groupSelection.emit(group);
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

    onUpdateSize(size: number) {
        this.onUpdatePagination(1);
    }
}
