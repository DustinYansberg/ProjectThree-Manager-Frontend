import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeesComponent } from './employees.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EmployeesComponent }
	])],
	exports: [RouterModule]
})
export class EmployeesRoutingModule { }
