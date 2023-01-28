import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';
// Calendar UI Module
import { CalendarModule } from 'ion2-calendar';
import { BillService } from '../../services/bill.service';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { HttpClientModule } from '@angular/common/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { CurrencyPipe } from '@angular/common';

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
    CalendarModule,
    HttpClientModule
  ],
  providers: [
    BillService,
    SQLite,
    SQLitePorter,
    CurrencyPipe
  ],
  declarations: [HomePage],

})
export class HomePageModule {}