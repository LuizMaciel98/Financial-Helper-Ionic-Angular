import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  CalendarModal,
  CalendarModalOptions,
  DayConfig,
  CalendarResult,
  CalendarComponentOptions
} from 'ion2-calendar';

import { Router } from '@angular/router';

 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // daysConfiguration: DayConfig[];
  date: string;
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  optionsMulti: CalendarComponentOptions = {
    daysConfig: this.getDaysConfig()
  };

  constructor(public modalCtrl: ModalController, private router: Router) {
    this.date = '';
    this.type = 'string';
    
    
    // this.daysConfiguration = _daysConfig;
    // this.openCalendar();
  }

  navigateToListBill() {
    this.router.navigate(['/list-bill']);
  }

  navigateToInsertBill() {
    this.router.navigate(['/insert-bill']);
  }

  onChange($event: any) {
    console.log($event);
  }

  getDaysConfig() {
    let _daysConfig: DayConfig[] = [];
    for (let i = 0; i < 31; i++) {
      _daysConfig.push({
        date: new Date(2023, 0, i + 1),
        // subTitle: `$${i + 1}`
        subTitle: 'Vencida'
      })
    }
    return _daysConfig;
  }
 
  async openCalendar() {
    // const options: CalendarModalOptions = {
    //   title: 'BASIC'
    // };
 
    // const myCalendar = await this.modalCtrl.create({
    //   component: CalendarModal,
    //   componentProps: { options }
    // });
 
    // myCalendar.present();
 
    // const event: any = await myCalendar.onDidDismiss();
    // const date: CalendarResult = event.data;
    // console.log(date);
    let _daysConfig: DayConfig[] = [];
    for (let i = 0; i < 31; i++) {
      _daysConfig.push({
        date: new Date(2023, 0, i + 1),
        subTitle: `$${i + 1}`
      })
    }
  
    const options: CalendarModalOptions = {
      from: new Date(2023, 0, 1),
      to: new Date(2023, 11.1),
      daysConfig: _daysConfig
    };
  
    const myCalendar = await this.modalCtrl.create({
      component: CalendarModal,
      componentProps: { options }
    });
  
    myCalendar.present();
  
    const event: any = await myCalendar.onDidDismiss();
    const date: CalendarResult = event.data;
    console.log(date);
  }
}