import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ListBillPageRoutingModule } from './list-bill-routing.module';
import { ListBillPage } from './list-bill.page';

import { SQLite } from '@ionic-native/sqlite/ngx';
import { HttpClientModule } from '@angular/common/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { BillDataBase } from '../../dataBase/bill.dataBase';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListBillPageRoutingModule,
    HttpClientModule
  ],
  providers: [
    SQLite, 
    SQLitePorter,
    BillDataBase
  ],  
  declarations: [
    ListBillPage
  ]
})
export class ListBillPageModule {}
