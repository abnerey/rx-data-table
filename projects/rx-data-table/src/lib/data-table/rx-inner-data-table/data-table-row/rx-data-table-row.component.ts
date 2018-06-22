import {ChangeDetectionStrategy, Component, Inject, Input, TemplateRef} from '@angular/core';
import {RxInnerDataTableComponent} from '../rx-inner-data-table.component';
import {getRecursiveProperty} from '../../shared/rx-data-table.utils';

@Component({
    selector: '[rxDataTableRow]',
    templateUrl: './rx-data-table-row.component.html',
    styleUrls: ['./rx-data-table-row.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RxDataTableRowComponent {
    @Input() template: TemplateRef<any>;
    @Input() dataRow: any;
    descriptors: string[];

    constructor(@Inject(RxInnerDataTableComponent) private innerDataTable: RxInnerDataTableComponent) {
        if (innerDataTable && innerDataTable.descriptors) {
            this.descriptors = innerDataTable.descriptors;
        }
    }

    valueFormatter(row: any, field: string): string {
        return getRecursiveProperty(field, row);
    }
}
