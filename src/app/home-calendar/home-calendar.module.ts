import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeCalendarPageRoutingModule } from './home-calendar-routing.module';

import { HomeCalendarPage } from './home-calendar.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeCalendarPageRoutingModule,
    IonicModule.forRoot(),
  ],
  declarations: [HomeCalendarPage]
})
export class HomeCalendarPageModule {}
