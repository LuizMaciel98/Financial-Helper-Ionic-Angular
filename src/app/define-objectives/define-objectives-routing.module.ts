import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefineObjectivesPage } from './define-objectives.page';

const routes: Routes = [
  {
    path: '',
    component: DefineObjectivesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefineObjectivesPageRoutingModule {}
