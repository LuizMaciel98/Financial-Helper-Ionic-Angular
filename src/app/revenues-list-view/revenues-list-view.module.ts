import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RevenuesListViewPageRoutingModule } from './revenues-list-view-routing.module';

import { RevenuesListViewPage } from './revenues-list-view.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RevenuesListViewPageRoutingModule,
    SharedModule
  ],
  declarations: [
    RevenuesListViewPage
  ],
  exports: [
    RevenuesListViewPage
  ]
})
export class RevenuesListViewPageModule {}
