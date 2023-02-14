import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GlobalHeaderComponent } from './global-header.component';
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
        GlobalHeaderComponent
    ],
    exports: [
        GlobalHeaderComponent
    ]
})
export class GlobalHeaderModule { }
  
  