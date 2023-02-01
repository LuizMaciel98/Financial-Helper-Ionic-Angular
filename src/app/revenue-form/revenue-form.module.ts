import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RevenueFormComponent } from './revenue-form.component';
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
        RevenueFormComponent
    ],
    exports: [
        RevenueFormComponent
    ]
})
export class RevenueFormsModule { }
  
  