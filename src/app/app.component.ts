import { PaginationStrategy } from './../../projects/rx-data-table/src/lib/data-table/models/pagination-strategy.enum';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { users as fixture } from '../assets/fixtures/users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'RxDataTable';

  // Data
  users = [];
  subjectUsers: BehaviorSubject<any>;
  usersDescriptions = ['firstName', 'secondName', 'firstSurname', 'secondSurname', 'nickname'];
  usersPaginationStrategy = PaginationStrategy.INTERNAL;

  ngOnInit() {
    this.users = [...fixture]
    console.log(this.users);
    this.subjectUsers = new BehaviorSubject<any>(this.users);
  }

  onSelection(userSelected) {
    console.log('userSelected', userSelected);
  }

  addUser() {
  }
}
