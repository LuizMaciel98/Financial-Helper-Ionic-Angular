import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillFormModule } from '../components/bill-form/bill-form.module';
import { RevenueFormsModule } from '../components/revenue-form/revenue-form.module';
import { GlobalHeaderModule } from '../components/global-header/global-header.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BillFormModule,
    RevenueFormsModule,
    GlobalHeaderModule,
  ],
  exports: [
    ReactiveFormsModule,
    BillFormModule,
    RevenueFormsModule,
    GlobalHeaderModule,
  ]
})
export class SharedModule { }
