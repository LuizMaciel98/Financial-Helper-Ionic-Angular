import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditBillPageRoutingModule } from './edit-bill-routing.module';

import { EditBillPage } from './edit-bill.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditBillPageRoutingModule
  ],
  declarations: [EditBillPage]
})
export class EditBillPageModule {}
