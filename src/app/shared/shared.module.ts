import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillFormModule } from '../bill-form/bill-form.module';
import { RevenueFormsModule } from '../revenue-form/revenue-form.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BillFormModule,
    RevenueFormsModule,
  ],
  exports: [
    ReactiveFormsModule,
    BillFormModule,
    RevenueFormsModule
  ]
})
export class SharedModule { }
