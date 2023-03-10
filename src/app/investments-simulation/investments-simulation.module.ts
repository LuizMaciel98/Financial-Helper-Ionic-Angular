import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvestmentsSimulationPageRoutingModule } from './investments-simulation-routing.module';

import { InvestmentsSimulationPage } from './investments-simulation.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvestmentsSimulationPageRoutingModule,
    SharedModule
  ],
  declarations: [InvestmentsSimulationPage]
})
export class InvestmentsSimulationPageModule {}
