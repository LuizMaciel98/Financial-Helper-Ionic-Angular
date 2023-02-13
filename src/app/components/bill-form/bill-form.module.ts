import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BillFormComponent } from './bill-form.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		IonicModule
	],
	declarations: [
		BillFormComponent
	],
	exports: [
		BillFormComponent
	]
})
export class BillFormModule { }
