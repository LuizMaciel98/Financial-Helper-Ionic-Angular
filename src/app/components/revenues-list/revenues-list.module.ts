import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RevenuesListComponent } from './revenues-list.component';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		IonicModule
	],
	declarations: [
		RevenuesListComponent
	],
	exports: [
		RevenuesListComponent
	]
})
export class RevenuesListModule { }
