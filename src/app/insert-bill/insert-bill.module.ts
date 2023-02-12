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
import { BillService } from 'src/services/bill.service';
import { BillRecurrentDataBase } from 'src/dataBase/billRecurrent.dataBase';

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
    BillService,
    BillRecurrentDataBase,
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
