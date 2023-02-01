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
import { RevenueService } from '../../services/revenue.service';
import { Revenue } from '../../models/revenue.model';
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
  choosedMonthExpenses: number;
  choosedMonthRevenues: number;
  choosedMonthBalance: number;
  formattedChoosedMonthExpenses: any;
  formattedChoosedMonthRevenues: any;
  formattedChoosedMonthBalance: any;

  billsChoosedMonth: Bill[];
  revenuesChoosedMonth: Revenue[];

  constructor(
    public modalCtrl: ModalController, 
    private router: Router, 
    public billService: BillService, 
    public revenueService: RevenueService, 
    private currencyPipe: CurrencyPipe
    ) {

    // this.choosedDate = this.calculateInitialChoosedDate();
    // this.choosedMonth = this.calculateInitialChoosedMonth();

    let date = new Date();

    this.choosedDate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.choosedMonth = this.choosedDate.toLocaleString('default', { month: 'long' });

    this.billsChoosedMonth = [];
    this.revenuesChoosedMonth = [];
    this.choosedMonthExpenses = 0;
    this.choosedMonthExpenses = 0;
    this.choosedMonthRevenues = 0;
    this.choosedMonthBalance = 0;
    
    this.calculateChoosedMonth();
  }

  async ngOnInit() {
    // this.calculateInitialChoosedDate();
    this.calculateInitialChoosedMonth();
    this.calculateChoosedMonth();
  }

  ionViewWillEnter() {
    // this.calculateInitialChoosedDate();
    this.calculateInitialChoosedMonth();
    this.calculateChoosedMonth();
  }

  // calculateInitialChoosedDate() {
  //   if(this.choosedDate == undefined |) {
  //     this.choosedDate = new Date();
  //   }

  //   return this.choosedDate;
  // }

  calculateInitialChoosedMonth() {
    if(this.choosedDate != undefined)
      this.choosedMonth = this.choosedDate.toLocaleString('default', { month: 'long' });

    return this.choosedMonth;
  }

  calculateMonthString() {
    console.log('calculateMonthString');
    console.log('this.choosedDate : ' + JSON.stringify(this.choosedDate));
    console.log('this.choosedDate.getMonth() : ' + JSON.stringify(this.choosedDate.getMonth()));

    let monthNumer = (this.choosedDate.getMonth());
    
    // if(this.choosedDate.getMonth() == 0){
    monthNumer = (this.choosedDate.getMonth() + 1);
    // }
    let month : string = monthNumer.toString();
    if(month.length == 1) {
      month = '0' + month;
    }
    return month;
  }

  async calculateChoosedMonth() {
    console.log('calculateChoosedMonth');
    await this.calculateChoosedMonthExpenses();
    await this.calculateChoosedMonthRevenues();
    
    console.log('this.choosedMonthRevenues - this.choosedMonthExpenses: ' + JSON.stringify(this.choosedMonthRevenues - this.choosedMonthExpenses));
    console.log('this.choosedMonthBalance: ' + JSON.stringify(this.choosedMonthBalance));
    this.choosedMonthBalance = this.choosedMonthRevenues - this.choosedMonthExpenses;
    this.formattedChoosedMonthBalance = await this.currencyPipe.transform(this.choosedMonthBalance, 'BRL', true);
    console.log('choosedMonthBalance: ' + JSON.stringify(this.choosedMonthBalance));
  }

  async calculateChoosedMonthExpenses() {
    console.log('calculateChoosedMonthExpenses');
    
    // console.log(JSON.stringify(this.choosedDate));
    // console.log(JSON.stringify(this.choosedDate.getMonth()));
    // console.log(JSON.stringify(this.choosedDate));
    // console.log(JSON.stringify(this.choosedDate.getFullYear()));
    
    let month = this.calculateMonthString();
    let year = this.choosedDate.getFullYear().toString();
    
    // console.log(JSON.stringify(month));
    // console.log(JSON.stringify(year));
    

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
        if(bill.price != undefined && bill.price != null)
          this.choosedMonthExpenses = this.choosedMonthExpenses + bill.price;
      });
    }

    this.formattedChoosedMonthExpenses = await this.currencyPipe.transform(this.choosedMonthExpenses, 'BRL', true);
    console.log('choosedMonthExpenses: ' + JSON.stringify(this.choosedMonthExpenses));
  }

  async calculateChoosedMonthRevenues() {
    console.log('calculateChoosedMonthExpenses');

    let month = this.calculateMonthString();
    let year = this.choosedDate.getFullYear().toString();
  
    let query = {
      date: {
        month: month,
        year: year
      }
    };
    this.revenuesChoosedMonth = await this.revenueService.getRevenues(query) as Revenue[];
  
    this.choosedMonthRevenues = 0;
    if(this.revenuesChoosedMonth != undefined && this.revenuesChoosedMonth.length > 0) {
      this.revenuesChoosedMonth.forEach(revenue => {
        if(revenue.amount != undefined && revenue.amount != null)
          this.choosedMonthRevenues = this.choosedMonthRevenues + revenue.amount;
      });
    }
  
    this.formattedChoosedMonthRevenues = await this.currencyPipe.transform(this.choosedMonthRevenues, 'BRL', true);
    console.log('choosedMonthRevenues: ' + JSON.stringify(this.choosedMonthRevenues));
  }
  

  navigateToListBill() {
    this.router.navigate(['/list-bill']);
  }
  
  navigateToInsertBill() {
    this.router.navigate(['/insert-bill']);
  }
  
  navigateToInsertRevenue(){
    this.router.navigate(['/insert-revenue']);
  }
  
  navigateToListRevenue(){
    this.router.navigate(['/list-revenue']);
  }

  navigateToNextMonth() {

    console.log('navigateToNextMonth');
    console.log('choosedDate: ' + this.choosedDate);
    console.log('choosedMonth: ' + this.choosedMonth);

    this.choosedDate.setMonth(this.choosedDate.getMonth() + 1);
    this.choosedMonth = this.choosedDate.toLocaleString('default', { month: 'long' });

    console.log('choosedDate: ' + this.choosedDate);
    console.log('choosedMonth: ' + this.choosedMonth);

    this.calculateChoosedMonth();
  }

  navigateToPreviousMonth() {
    this.choosedDate.setMonth(this.choosedDate.getMonth() - 1);
    this.choosedMonth = this.choosedDate.toLocaleString('default', { month: 'long' });

    this.calculateChoosedMonth();
  }
}