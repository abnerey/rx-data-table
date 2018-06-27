import { TableGroupComponent } from './../components/table-group/table-group.component';
import { BasicTableComponent } from './../components/basic-table/basic-table.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

export const routes: Routes = [
   {path: '', redirectTo: 'basic', pathMatch: 'full'},
   {path: 'basic', component: BasicTableComponent},
   {path: 'group', component: TableGroupComponent}
]

@NgModule({
   imports: [
      RouterModule.forRoot(routes)
   ],
   exports: [RouterModule],
   providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class RoutingModule {

}