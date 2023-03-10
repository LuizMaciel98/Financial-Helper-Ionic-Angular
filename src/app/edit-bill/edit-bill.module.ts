import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { EditBillPageRoutingModule } from './edit-bill-routing.module';
import { EditBillPage } from './edit-bill.page';

import { SQLite } from '@ionic-native/sqlite/ngx';
import { HttpClientModule } from '@angular/common/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { BillDataBase } from '../../dataBase/bill.dataBase';
import { BillFormComponent } from '../components/bill-form/bill-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    EditBillPageRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    SQLite, 
    SQLitePorter,
    BillDataBase
  ],
  declarations: [EditBillPage]
})
export class EditBillPageModule {}
