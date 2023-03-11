import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillsListViewPageRoutingModule } from './bills-list-view-routing.module';

import { BillsListViewPage } from './bills-list-view.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillsListViewPageRoutingModule,
    SharedModule
  ],
  declarations: [BillsListViewPage]
})
export class BillsListViewPageModule {}
