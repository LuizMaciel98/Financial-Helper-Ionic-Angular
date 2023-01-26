import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { InsertBillPageRoutingModule } from './insert-bill-routing.module';

import { InsertBillPage } from './insert-bill.page';
import { NgxMaskModule } from 'ngx-mask';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { HttpClientModule } from '@angular/common/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';

import {IonicInputMaskModule} from "@thiagoprz/ionic-input-mask";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    InsertBillPageRoutingModule,
    IonicInputMaskModule,
    HttpClientModule
  ],
  providers: [SQLite, SQLitePorter],
  declarations: [InsertBillPage]
})
export class InsertBillPageModule {}
