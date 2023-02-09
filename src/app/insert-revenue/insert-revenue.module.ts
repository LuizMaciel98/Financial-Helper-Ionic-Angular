import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { InsertRevenuePageRoutingModule } from './insert-revenue-routing.module';
import { InsertRevenuePage } from './insert-revenue.page';

import { SQLite } from '@ionic-native/sqlite/ngx';
import { HttpClientModule } from '@angular/common/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { RevenueDataBase } from '../../dataBase/revenue.dataBase';
// import { revenueFormComponent } from '../revenue-form/revenue-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    InsertRevenuePageRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    SQLite, 
    SQLitePorter, 
    RevenueDataBase
  ],
  declarations: [
    InsertRevenuePage
  ],
  exports: [
    InsertRevenuePage
  ]
})
export class InsertRevenuePageModule {}
