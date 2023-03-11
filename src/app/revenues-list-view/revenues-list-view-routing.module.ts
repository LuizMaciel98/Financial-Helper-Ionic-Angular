import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RevenuesListViewPage } from './revenues-list-view.page';

const routes: Routes = [
  {
    path: '',
    component: RevenuesListViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevenuesListViewPageRoutingModule {}
