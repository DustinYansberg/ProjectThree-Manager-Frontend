import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeDetailComponent } from './employee-detail.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: EmployeeDetailComponent }]),
  ],
  exports: [RouterModule],
})
export class EmployeeDetailRoutingModule {}
