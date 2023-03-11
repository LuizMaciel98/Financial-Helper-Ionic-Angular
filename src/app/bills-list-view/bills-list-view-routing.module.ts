import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillsListViewPage } from './bills-list-view.page';

const routes: Routes = [
  {
    path: '',
    component: BillsListViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillsListViewPageRoutingModule {}
