import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  CalendarModal,
  CalendarModalOptions,
  DayConfig,
  CalendarResult,
  CalendarComponentOptions
} from 'ion2-calendar';

import { BillService } from '../../services/bill.service';
import { Bill } from '../../models/bill.model';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // daysConfiguration: DayConfig[];
  // date: string;
  // type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  // optionsMulti: CalendarComponentOptions = {
  //   daysConfig: this.getDaysConfig()
  // };
  verifiedMonth: string;
  verifiedDate: Date;
  // bills: Bill[];

  constructor(public modalCtrl: ModalController, private router: Router, public billService: BillService) {
    this.verifiedDate = new Date();
    this.verifiedMonth = this.verifiedDate.toLocaleString('default', { month: 'long' });
    // console.log(billService.getBillsByDueDate(this.verifiedDate.getMonth(), this.verifiedDate.getFullYear()));
    // console.log(this.bills);
    // this.bills = this.billService.getBillsByDueDate(this.verifiedDate.getMonth(), this.verifiedDate.getFullYear());
  }

  async callSomeFunction() {
  }

  navigateToListBill() {
    this.router.navigate(['/list-bill']);
  }

  navigateToInsertBill() {
    this.router.navigate(['/insert-bill']);
  }

  navigateToNextMonth() {
    this.verifiedDate.setMonth(this.verifiedDate.getMonth() + 1);
    this.verifiedMonth = this.verifiedDate.toLocaleString('default', { month: 'long' });

    //TO DO CALCULATE RECEITAS AND DESPESAS
  }
  
  navigateToPreviousMonth() {
    this.verifiedDate.setMonth(this.verifiedDate.getMonth() - 1);
    this.verifiedMonth = this.verifiedDate.toLocaleString('default', { month: 'long' });

    //TO DO CALCULATE RECEITAS AND DESPESAS
  }

  // onChange($event: any) {
  //   console.log($event);
  // }

  // getDaysConfig() {
  //   let _daysConfig: DayConfig[] = [];
  //   for (let i = 0; i < 31; i++) {
  //     let numberPastDue = 0;
  //     let currentDate = new Date(2023, 0, i + 1);
  //     console.log(currentDate);
  //     console.log(currentDate.getDay().toString());
  //     _daysConfig.push({
  //       date: currentDate,
  //       // subTitle: `$${i + 1}`
  //       // marked: true,
  //       title: currentDate.getDate().toString(),
  //       subTitle: 'Vencido'
  //     })
  //   }
  //   return _daysConfig;
  // }
 
  // async openCalendar() {
  //   // const options: CalendarModalOptions = {
  //   //   title: 'BASIC'
  //   // };
 
  //   // const myCalendar = await this.modalCtrl.create({
  //   //   component: CalendarModal,
  //   //   componentProps: { options }
  //   // });
 
  //   // myCalendar.present();
 
  //   // const event: any = await myCalendar.onDidDismiss();
  //   // const date: CalendarResult = event.data;
  //   // console.log(date);
  //   let _daysConfig: DayConfig[] = [];
  //   for (let i = 0; i < 31; i++) {
  //     _daysConfig.push({
  //       date: new Date(2023, 0, i + 1),
  //       subTitle: `$${i + 1}`
  //     })
  //   }
  
  //   const options: CalendarModalOptions = {
  //     from: new Date(2023, 0, 1),
  //     to: new Date(2023, 11.1),
  //     daysConfig: _daysConfig
  //   };
  
  //   const myCalendar = await this.modalCtrl.create({
  //     component: CalendarModal,
  //     componentProps: { options }
  //   });
  
  //   myCalendar.present();
  
  //   const event: any = await myCalendar.onDidDismiss();
  //   const date: CalendarResult = event.data;
  //   console.log(date);
  // }
}