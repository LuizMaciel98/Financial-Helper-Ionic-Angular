import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListBillPageRoutingModule } from './list-bill-routing.module';

import { ListBillPage } from './list-bill.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListBillPageRoutingModule
  ],
  declarations: [ListBillPage]
})
export class ListBillPageModule {}
