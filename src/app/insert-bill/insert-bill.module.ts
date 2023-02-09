import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { InsertBillPageRoutingModule } from './insert-bill-routing.module';
import { InsertBillPage } from './insert-bill.page';

import { SQLite } from '@ionic-native/sqlite/ngx';
import { HttpClientModule } from '@angular/common/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { BillDataBase } from '../../dataBase/bill.dataBase';
// import { BillFormComponent } from '../bill-form/bill-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    InsertBillPageRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    SQLite, 
    SQLitePorter, 
    BillDataBase
  ],
  declarations: [
    InsertBillPage
  ],
  exports: [
    InsertBillPage
  ]
})
export class InsertBillPageModule {}
