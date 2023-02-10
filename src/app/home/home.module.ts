import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { BillDataBase } from '../../dataBase/bill.dataBase';
import { RevenueDataBase } from '../../dataBase/revenue.dataBase';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { HttpClientModule } from '@angular/common/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { CurrencyPipe } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    HttpClientModule,
    NgChartsModule
  ],
  providers: [
    BillDataBase,
    RevenueDataBase,
    SQLite,
    SQLitePorter,
    CurrencyPipe
  ],
  declarations: [HomePage],

})
export class HomePageModule {}