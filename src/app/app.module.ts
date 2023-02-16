import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { IonicStorageModule } from '@ionic/storage-angular';
// import { NgxMaskModule } from 'ngx-mask';
import {IonicInputMaskModule} from "@thiagoprz/ionic-input-mask";
// import { BillService } from '../../services/bill.service';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { HttpClientModule } from '@angular/common/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
// import { BillFormComponent } from './bill-form/bill-form.component';

import { NotificationDataBase } from '../dataBase/notification.dataBase';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    IonicInputMaskModule, 
    HttpClientModule
  ],
  providers: [
    SQLite, 
    SQLitePorter, 
    NotificationDataBase,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}