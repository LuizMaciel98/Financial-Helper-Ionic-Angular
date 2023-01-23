import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditBillPage } from './edit-bill.page';

const routes: Routes = [
  {
    path: '',
    component: EditBillPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditBillPageRoutingModule {}
