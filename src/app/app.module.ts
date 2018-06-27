import { BasicTableComponent } from './components/basic-table/basic-table.component';
import { RoutingModule } from './routing/routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RxDataTableModule } from 'projects/rx-data-table/src/public_api';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material/material.module';
import { TableGroupComponent } from './components/table-group/table-group.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicTableComponent,
    TableGroupComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    MaterialModule,
    RxDataTableModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
