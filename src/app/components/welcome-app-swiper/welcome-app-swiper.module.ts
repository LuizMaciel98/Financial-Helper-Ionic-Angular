import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WelcomeAppSwiperComponent } from './welcome-app-swiper.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		IonicModule,
		SwiperModule
	],
	declarations: [
		WelcomeAppSwiperComponent
	],
	exports: [
		WelcomeAppSwiperComponent
	]
})
export class WelcomeAppSwiperModule { }
