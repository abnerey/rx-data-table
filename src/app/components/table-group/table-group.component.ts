import { PaginationStrategy } from './../../../../projects/rx-data-table/src/lib/data-table/models/pagination-strategy.enum';
import { BehaviorSubject } from 'rxjs';
import { Component } from "@angular/core";
import { TableGroupService } from './shared/table-group.service';
import { groupUsers } from './../../../assets/fixtures/groupUsers';

@Component({
   selector: 'app-table-group',
   templateUrl: './table-group.component.html',
   styleUrls: ['./table-group.component.scss'],
   providers: [TableGroupService]
})
export class TableGroupComponent {
   groupsDescriptors = ['firstName', 'secondName', 'firstSurname', 'secondSurname', 'nickname'];
   subjectGroups: BehaviorSubject<any>;
   userGroups: any[];
   groupPaginationStrategy = PaginationStrategy.NONE;

   constructor() {
      this.userGroups = groupUsers;
      this.subjectGroups = new BehaviorSubject<any>(this.userGroups);
   }
}