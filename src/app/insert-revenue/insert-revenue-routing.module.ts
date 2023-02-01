import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsertRevenuePage } from './insert-revenue.page';

const routes: Routes = [
  {
    path: '',
    component: InsertRevenuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsertRevenuePageRoutingModule {}
