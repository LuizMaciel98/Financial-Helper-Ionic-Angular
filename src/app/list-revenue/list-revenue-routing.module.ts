import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListRevenuePage } from './list-revenue.page';

const routes: Routes = [
  {
    path: '',
    component: ListRevenuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListRevenuePageRoutingModule {}
