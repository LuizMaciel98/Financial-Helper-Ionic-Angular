import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DefineObjectivesPageRoutingModule } from './define-objectives-routing.module';

import { DefineObjectivesPage } from './define-objectives.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DefineObjectivesPageRoutingModule,
    SharedModule
  ],
  declarations: [DefineObjectivesPage]
})
export class DefineObjectivesPageModule {}
