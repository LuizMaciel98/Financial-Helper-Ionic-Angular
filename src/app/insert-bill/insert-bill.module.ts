import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { InsertBillPageRoutingModule } from './insert-bill-routing.module';

import { InsertBillPage } from './insert-bill.page';

import { NgxMaskModule } from 'ngx-mask';

import {IonicInputMaskModule} from "@thiagoprz/ionic-input-mask";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    InsertBillPageRoutingModule,
    IonicInputMaskModule
  ],
  declarations: [InsertBillPage]
})
export class InsertBillPageModule {}
