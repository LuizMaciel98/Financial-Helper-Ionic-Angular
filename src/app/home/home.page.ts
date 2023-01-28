import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
// import {
//   CalendarModal,
//   CalendarModalOptions,
//   DayConfig,
//   CalendarResult,
//   CalendarComponentOptions
// } from 'ion2-calendar';

import { BillService } from '../../services/bill.service';
import { Bill } from '../../models/bill.model';
import { CurrencyPipe } from '@angular/common';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // daysConfiguration: DayConfig[];
  // date: string;
  // type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  // optionsMulti: CalendarComponentOptions = {
  //   daysConfig: this.getDaysConfig()
  // };
  choosedMonth: string;
  choosedDate: Date;
  choosedMonthExpenses: number | any;

  billsChoosedMonth: Bill[];

  constructor(public modalCtrl: ModalController, private router: Router, public billService: BillService, private currencyPipe: CurrencyPipe) {
    
    // this.choosedDate = this.calculateInitialChoosedDate();
    // this.choosedMonth = this.calculateInitialChoosedMonth();

    this.choosedDate = new Date();
    this.choosedMonth = this.choosedDate.toLocaleString('default', { month: 'long' });

    this.billsChoosedMonth = [];
    this.choosedMonthExpenses = 0;
    
    this.calculateChoosedMonth();
  }

  async ngOnInit() {
    this.calculateInitialChoosedDate();
    this.calculateInitialChoosedMonth();
    this.calculateChoosedMonth();
  }

  ionViewWillEnter() {
    this.calculateInitialChoosedDate();
    this.calculateInitialChoosedMonth();
    this.calculateChoosedMonth();
  }

  calculateInitialChoosedDate() {
    if(this.choosedDate != undefined) {
      this.choosedDate = new Date();
    }

    return this.choosedDate;
  }

  calculateInitialChoosedMonth() {
    if(this.choosedDate != undefined)
      this.choosedMonth = this.choosedDate.toLocaleString('default', { month: 'long' });

    return this.choosedMonth;
  }

  calculateMonthString() {
    let month : string = (this.choosedDate.getMonth() + 1).toString();
    if(month.length == 1) {
      month = '0' + month;
    }
    return month;
  }

  async calculateChoosedMonth() {
    console.log('calculateChoosedMonth');
    
    // console.log(JSON.stringify(this.choosedDate));
    // console.log(JSON.stringify(this.choosedDate.getMonth()));
    // console.log(JSON.stringify(this.choosedDate));
    // console.log(JSON.stringify(this.choosedDate.getFullYear()));
    
    let month = this.calculateMonthString();
    let year = this.choosedDate.getFullYear().toString();
    
    console.log(JSON.stringify(month));
    console.log(JSON.stringify(year));
    

    let query = {
      dueDate: {
        month: month,
        year: year
      }
    };
    console.log(JSON.stringify(query));
    this.billsChoosedMonth = await this.billService.getBills(query) as Bill[];

    console.log(this.billsChoosedMonth);

    this.choosedMonthExpenses = 0;
    if(this.billsChoosedMonth != undefined && this.billsChoosedMonth.length > 0) {
      this.billsChoosedMonth.forEach(bill => {
        this.choosedMonthExpenses = this.choosedMonthExpenses + bill.price;
      });
    }

    this.choosedMonthExpenses = this.currencyPipe.transform(this.choosedMonthExpenses, 'BRL', true);
  }

  navigateToListBill() {
    this.router.navigate(['/list-bill']);
  }

  navigateToInsertBill() {
    this.router.navigate(['/insert-bill']);
  }

  navigateToNextMonth() {
    this.choosedDate.setMonth(this.choosedDate.getMonth() + 1);
    this.choosedMonth = this.choosedDate.toLocaleString('default', { month: 'long' });

    this.calculateChoosedMonth();
  }
  
  navigateToPreviousMonth() {
    this.choosedDate.setMonth(this.choosedDate.getMonth() - 1);
    this.choosedMonth = this.choosedDate.toLocaleString('default', { month: 'long' });
    
    this.calculateChoosedMonth();
  }
}