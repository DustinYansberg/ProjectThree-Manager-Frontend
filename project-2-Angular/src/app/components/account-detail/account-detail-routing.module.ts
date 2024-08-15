import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountDetailComponent } from './account-detail.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: AccountDetailComponent }]),
  ],
  exports: [RouterModule],
})
export class AccountDetailRoutingModule {}
