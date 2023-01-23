import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListBillPage } from './list-bill.page';

const routes: Routes = [
  {
    path: '',
    component: ListBillPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListBillPageRoutingModule {}
