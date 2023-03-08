import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OverdueModalComponent } from './overdue-modal.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        IonicModule,
        RouterModule
    ],
    declarations: [
        OverdueModalComponent
    ],
    exports: [
        OverdueModalComponent
    ]
})
export class OverdueModalModule { }
  
  