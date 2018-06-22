import {Component, EventEmitter, Inject, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {animate, style, trigger, transition} from '@angular/animations';
import {DataGroup} from '../../models/data-group.interface';
import {RxInnerDataTableComponent} from '../rx-inner-data-table.component';
import {DataTableGroupEvent} from '../../models/data-table-group-event.model';
import {clone} from '../../shared/rx-data-table.utils';

@Component({
    selector: '[rxDataTableRowGroup]',
    templateUrl: './data-table-row-group.component.html',
    styleUrls: ['./data-table-row-group.component.css'],
    animations: [
        trigger('fadeIn', [
            transition(':enter', [
                style({ opacity: '0' }),
                animate('.5s ease-out', style({ opacity: '1' })),
            ]),
            transition(':leave', [
                style({ opacity: '1' }),
                animate('.2s ease-out', style({ opacity: '0' })),
            ])
        ])
    ]
})
export class RxDataTableRowGroupComponent implements OnInit {
    @Input() templateGroup: TemplateRef<any>;
    @Input() templateRow: TemplateRef<any>;
    @Input() group: DataGroup<any>;
    @Output() toggleGroup = new EventEmitter<any>();
    @Output() selectRow = new EventEmitter<any>();

    // Properties
    descriptors: string[];
    expanded = false;

    // Computed Properties
    get colspan() {
        return this.descriptors.length;
    }

    ngOnInit(): void {
    }

    constructor(@Inject(RxInnerDataTableComponent) innerDataTable: RxInnerDataTableComponent){
        this.descriptors = innerDataTable.descriptors;
    }

    onExpandGroup() {
        this.expanded = !this.expanded;
        const cloneGroup = clone(this.group);
        delete cloneGroup['expanded'];
        this.toggleGroup.emit(new DataTableGroupEvent(cloneGroup, this.expanded));
    }

    onSelectRow(dataRow) {
        this.selectRow.emit(dataRow);
    }
}
