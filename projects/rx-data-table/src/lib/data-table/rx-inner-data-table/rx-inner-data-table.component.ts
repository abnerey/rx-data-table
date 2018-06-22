import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import {DataTableStrategies, DataTableStrategy} from '../models/data-table-strategy';
import {DataTableGroupEvent} from '../models/data-table-group-event.model';

@Component({
    selector: 'rx-inner-data-table',
    templateUrl: './rx-inner-data-table.component.html',
    styleUrls: ['./rx-inner-data-table.component.css'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RxInnerDataTableComponent {
    // Templates
    @Input() dataTableRow: TemplateRef<any>;
    @Input() dataTableHeader: TemplateRef<any>;
    @Input() dataTableGroup: TemplateRef<any>;

    // Inputs
    @Input() dataSource: any[];
    @Input() descriptors: string[];
    @Input() dataTableStrategy: string;

    // Outputs
    @Output() rowSelection = new EventEmitter<any>();
    @Output() groupSelection = new EventEmitter<any>();

    // Properties
    strategies: DataTableStrategy = DataTableStrategies;

    constructor() {
    }

    onRowSelection(row: any) {
        this.rowSelection.emit(row);
    }

    onGroupSelection(groupEvent: DataTableGroupEvent) {
        this.groupSelection.emit(groupEvent);
    }

}
