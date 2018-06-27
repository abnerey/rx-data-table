import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { PaginationStrategy } from './../../../../projects/rx-data-table/src/lib/data-table/models/pagination-strategy.enum';
import { users as fixture } from '../../../assets/fixtures/users';

@Component({
   selector: 'app-basic-table',
   templateUrl: './basic-table.component.html',
   styleUrls: ['./basic-table.component.scss']
})
export class BasicTableComponent {
   // Data
   users = [];
   subjectUsers: BehaviorSubject<any>;
   usersDescriptions = ['firstName', 'secondName', 'firstSurname', 'secondSurname', 'nickname'];
   usersPaginationStrategy = PaginationStrategy.INTERNAL;

   ngOnInit() {
      this.users = [...fixture]
      this.subjectUsers = new BehaviorSubject<any>(this.users);
   }

   onSelection(userSelected) {
      console.log('userSelected', userSelected);
   }

   addUser() {
   }
}