import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvestmentsSimulationPage } from './investments-simulation.page';

const routes: Routes = [
  {
    path: '',
    component: InvestmentsSimulationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestmentsSimulationPageRoutingModule {}
