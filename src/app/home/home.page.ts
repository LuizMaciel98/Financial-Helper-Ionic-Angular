import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { BillDataBase } from '../../dataBase/bill.dataBase';
import { Bill } from '../../models/bill.model';
import { RevenueDataBase } from '../../dataBase/revenue.dataBase';
import { Revenue } from '../../models/revenue.model';
import { CurrencyPipe } from '@angular/common';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit  {
  choosedMonth: string;
  choosedDate: Date;
  choosedMonthExpenses: number;
  choosedMonthRevenues: number;
  choosedMonthBalance: number;
  formattedChoosedMonthExpenses: any;
  formattedChoosedMonthRevenues: any;
  formattedChoosedMonthBalance: any;

  @ViewChild('barCanvas') private barCanvas: ElementRef | any;

  barChart: any;

  billsChoosedMonth: Bill[];
  revenuesChoosedMonth: Revenue[];

  hasPastDueDate: boolean = true;
  hasCloseDueDate: boolean = true;

  constructor(
    public modalCtrl: ModalController, 
    private router: Router, 
    public billDataBase: BillDataBase, 
    public revenueDataBase: RevenueDataBase, 
    private currencyPipe: CurrencyPipe,
    private actionSheetCtrl: ActionSheetController
    ) {

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
    this.calculateInitialChoosedMonth();
    this.calculateChoosedMonth();
  }

  ionViewWillEnter() {
    this.calculateInitialChoosedMonth();
    this.calculateChoosedMonth();
  }

  calculateInitialChoosedMonth() {
    if(this.choosedDate != undefined)
      this.choosedMonth = this.choosedDate.toLocaleString('default', { month: 'long' });

    return this.choosedMonth;
  }

  calculateMonthString() {
    let monthNumer = (this.choosedDate.getMonth());
    
    monthNumer = (this.choosedDate.getMonth() + 1);

    let month : string = monthNumer.toString();
    if(month.length == 1) {
      month = '0' + month;
    }
    return month;
  }

  async calculateChoosedMonth() {
    await this.calculateChoosedMonthExpenses();
    await this.calculateChoosedMonthRevenues();
    
    this.choosedMonthBalance = this.choosedMonthRevenues - this.choosedMonthExpenses;
    this.formattedChoosedMonthBalance = await this.currencyPipe.transform(this.choosedMonthBalance, 'BRL', true);

    await this.barChartMethod();
    this.barChart.chart.update();
  }

  async calculateChoosedMonthExpenses() {
    let month = this.calculateMonthString();
    let year = this.choosedDate.getFullYear().toString();

    let query = {
      dueDate: {
        month: month,
        year: year
      }
    };
    console.log(JSON.stringify(query));
    this.billsChoosedMonth = await this.billDataBase.readObjects(query) as Bill[];

    console.log(this.billsChoosedMonth);

    this.choosedMonthExpenses = 0;
    if(this.billsChoosedMonth != undefined && this.billsChoosedMonth.length > 0) {
      this.billsChoosedMonth.forEach(bill => {
        if(bill.price != undefined && bill.price != null)
          this.choosedMonthExpenses = this.choosedMonthExpenses + bill.price;
      });
    }

    this.formattedChoosedMonthExpenses = await this.currencyPipe.transform(this.choosedMonthExpenses, 'BRL', true);
  }

  async calculateChoosedMonthRevenues() {
    let month = this.calculateMonthString();
    let year = this.choosedDate.getFullYear().toString();
  
    let query = {
      date: {
        month: month,
        year: year
      }
    };
    this.revenuesChoosedMonth = await this.revenueDataBase.readObjects(query) as Revenue[];
  
    this.choosedMonthRevenues = 0;
    if(this.revenuesChoosedMonth != undefined && this.revenuesChoosedMonth.length > 0) {
      this.revenuesChoosedMonth.forEach(revenue => {
        if(revenue.amount != undefined && revenue.amount != null)
          this.choosedMonthRevenues = this.choosedMonthRevenues + revenue.amount;
      });
    }
  
    this.formattedChoosedMonthRevenues = await this.currencyPipe.transform(this.choosedMonthRevenues, 'BRL', true);
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
    this.choosedDate.setMonth(this.choosedDate.getMonth() + 1);
    this.choosedMonth = this.choosedDate.toLocaleString('default', { month: 'long' });

    this.calculateChoosedMonth();
  }

  navigateToPreviousMonth() {
    this.choosedDate.setMonth(this.choosedDate.getMonth() - 1);
    this.choosedMonth = this.choosedDate.toLocaleString('default', { month: 'long' });

    this.calculateChoosedMonth();
  }

  ngAfterViewInit() {
    // this.barChartMethod();
    // this.barChart.chart.update();
  }

  barChartMethod() {
    
    if(this.barChart == null){
      this.barChart = new Chart(this.barCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: ['Receitas', 'Despesas'],
          datasets: this.getDataSets()
        },
        options: {
          scales: {
              y: {
                  ticks: {
                      callback: function(value, index, ticks) {
                          return 'R$' + value;
                      }
                  }
              }
          }
        }
      });
    } else {
      this.barChart.data.datasets.forEach((dataset : any) => {
        dataset.data.pop();
      });

      this.barChart.update();

      this.barChart.data.datasets = this.getDataSets();
      this.barChart.update();
    }
  }

  getDataSets() {
    let result = [
      // datasets: [
        {
          data: [this.choosedMonthRevenues, this.choosedMonthExpenses], 
          label: this.choosedMonth,
          backgroundColor: ['rgba(121, 255, 70, 0.9)', 'rgba(255, 95, 86, 0.9)'],
          // backgroundColor: ['rgba(255, 95, 86, 0.9)'],
          // borderWidth: 1
        },
        // {
        //   data: [this.choosedMonthExpenses], 
        //   label: 'Despesas',
        //   backgroundColor: ['rgba(255, 95, 86, 0.9)'],
        //   // borderWidth: 1
        // },
      // ]
    ];

    return result;
  }


  testButton() {
    console.log('testButton');
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Criar novos itens',
      // subHeader: 'Example subheader',
      mode: 'ios',
      buttons: [
        {
          text: 'Criar receita',
          handler: () => {
            this.navigateToInsertRevenue();
          },
        },
        {
          text: 'Criar conta',
          handler: () => {
            this.navigateToInsertBill();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
  }
}