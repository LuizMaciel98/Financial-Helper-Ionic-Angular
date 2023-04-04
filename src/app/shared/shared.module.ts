import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillFormModule } from '../components/bill-form/bill-form.module';
import { RevenueFormsModule } from '../components/revenue-form/revenue-form.module';
import { GlobalHeaderModule } from '../components/global-header/global-header.module';
import { OverdueModalModule } from '../components/overdue-modal/overdue-modal.module';
import { RevenuesListModule } from '../components/revenues-list/revenues-list.module';
import { WelcomeAppSwiperModule } from '../components/welcome-app-swiper/welcome-app-swiper.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BillFormModule,
    RevenueFormsModule,
    GlobalHeaderModule,
    OverdueModalModule,
    RevenuesListModule,
    WelcomeAppSwiperModule,
  ],
  exports: [
    ReactiveFormsModule,
    BillFormModule,
    RevenueFormsModule,
    GlobalHeaderModule,
    OverdueModalModule,
    RevenuesListModule,
    WelcomeAppSwiperModule,
  ]
})
export class SharedModule { }
