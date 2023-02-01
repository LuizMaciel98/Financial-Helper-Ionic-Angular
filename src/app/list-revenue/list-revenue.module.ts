import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ListRevenuePageRoutingModule } from './list-revenue-routing.module';
import { ListRevenuePage } from './list-revenue.page';

import { SQLite } from '@ionic-native/sqlite/ngx';
import { HttpClientModule } from '@angular/common/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { RevenueService } from '../../services/revenue.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListRevenuePageRoutingModule,
    HttpClientModule
  ],
  providers: [
    SQLite, 
    SQLitePorter,
    RevenueService
  ],
  declarations: [
    ListRevenuePage
  ]
})
export class ListRevenuePageModule {}
