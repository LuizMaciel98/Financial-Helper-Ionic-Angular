import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsertBillPage } from './insert-bill.page';

const routes: Routes = [
  {
    path: '',
    component: InsertBillPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsertBillPageRoutingModule {}
