import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { BillDataBase } from '../../dataBase/bill.dataBase';
import { BillService } from '../../services/bill.service';
import { BillRecurrentDataBase } from '../../dataBase/billRecurrent.dataBase';
import { RevenueDataBase } from '../../dataBase/revenue.dataBase';
import { LocalNotificationService } from '../../services/localNotification.service';
// import { LocalNotifications} from '@ionic-native/local-notifications/ngx'
import { SQLite } from '@ionic-native/sqlite/ngx';
import { HttpClientModule } from '@angular/common/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { CurrencyPipe } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { SwiperModule } from 'swiper/angular';
// import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

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
    NgChartsModule,
    SharedModule,
    SwiperModule
  ],
  providers: [
    BillDataBase,
    BillService,
    BillRecurrentDataBase,
    RevenueDataBase,
    SQLite,
    SQLitePorter,
    CurrencyPipe,
    LocalNotificationService,
  ],
  declarations: [HomePage],

})
export class HomePageModule {}