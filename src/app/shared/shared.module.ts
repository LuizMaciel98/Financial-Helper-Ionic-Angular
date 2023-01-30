import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillFormModule } from '../bill-form/bill-form.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BillFormModule
  ],
  exports: [
    ReactiveFormsModule,
    BillFormModule
  ]
})
export class SharedModule { }
