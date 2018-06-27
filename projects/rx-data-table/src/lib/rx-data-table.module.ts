import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RxInnerDataTableComponent } from './data-table/rx-inner-data-table/rx-inner-data-table.component';
import { RxDataTableRowComponent } from './data-table/rx-inner-data-table/data-table-row/rx-data-table-row.component';
import { RxDataTableRowGroupComponent } from './data-table/rx-inner-data-table/data-table-row-group/rx-data-table-row-group.component';
import { RxDataTableComponent } from './data-table/rx-data-table-basic/rx-data-table.component';
import { RxDataTableGroupComponent } from './data-table/rx-data-table-group/rx-data-table-group.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  declarations: [
    RxDataTableRowComponent,
    RxDataTableRowGroupComponent,
    RxInnerDataTableComponent,
    RxDataTableComponent,
    RxDataTableGroupComponent
  ],
  exports: [
    RxInnerDataTableComponent,
    RxDataTableComponent,
    RxDataTableGroupComponent
  ]
})
export class RxDataTableModule { }
