import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { BillDataBase } from '../../dataBase/bill.dataBase';
import { Bill } from '../../models/bill.model';
import { RevenueDataBase } from '../../dataBase/revenue.dataBase';
import { LocalNotificationService } from '../../services/localNotification.service';
import { Revenue } from '../../models/revenue.model';
import { CurrencyPipe } from '@angular/common';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { BillService } from 'src/services/bill.service';

// import {  } from 'cordova-plugin-android-permissions';
// import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { Device } from '@capacitor/device';
import { DatabaseUtils } from 'src/utils/databaseUtils';
import { DateUtils } from 'src/utils/dateUtils';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit, OnDestroy  {
    choosedYear: string;
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

    hasOverdueBills: boolean = false;
    hasCloseDueDate: boolean = false;

    overdueBills: Bill[] = [];

    constructor(
        public modalCtrl: ModalController,
        private router: Router,
        public billDataBase: BillDataBase,
        public billService: BillService,
        public revenueDataBase: RevenueDataBase,
        private currencyPipe: CurrencyPipe,
        private actionSheetCtrl: ActionSheetController,
        private localNotificationService: LocalNotificationService,
        // private androidPermissions: AndroidPermissions
    ) {

        this.handlePermissions();

        let date = new Date();

        this.choosedDate = new Date(date.getFullYear(), date.getMonth(), 1);
        this.choosedMonth = this.choosedDate.toLocaleString('default', { month: 'long' });
        this.choosedYear = this.choosedDate.getFullYear().toString();

        this.billsChoosedMonth = [];
        this.revenuesChoosedMonth = [];
        this.choosedMonthExpenses = 0;
        this.choosedMonthExpenses = 0;
        this.choosedMonthRevenues = 0;
        this.choosedMonthBalance = 0;
        
        this.calculateChoosedMonth();
        this.calculateCloseAndOverdueBills();
    }

    async ngOnInit() {
        await this.calculateInitialChoosedMonth();
        await this.calculateChoosedMonth();
    }

    ionViewWillEnter() {
        this.calculateInitialChoosedMonth();
        this.calculateChoosedMonth();
    }

    ngOnDestroy() {
        // Likewise, this will may not consistently fire when you navigate away
        // from the component
        console.log("LoginPage - OnDestroy")
    }

    private async handlePermissions(){
        console.log('handlePermissions');
        const deviceInfo = await Device.getInfo();

        console.log(JSON.stringify(deviceInfo.platform));

        if (deviceInfo.platform == 'android') {

            

            // var androidPermissions = this.androidPermissions;
            // var permissions = this.androidPermissions.PERMISSION;

            // let notificationsResult: any = await androidPermissions.hasPermission(permissions.CAMERA);
            // let hasPostNotificationPermission: boolean = notificationsResult.hasPermission;
            // console.log('notificationsResult:' + JSON.stringify(notificationsResult));
            // console.log('notificationsResult:' + JSON.stringify(notificationsResult.hasPermission));
            // console.log('notificationsResult:' + notificationsResult);

            // if (hasPostNotificationPermission == false) {
            //     console.log('tried to get permission');
            //     // try {

            //         // console.log(JSON.stringify(await androidPermissions.requestPermission(permissions.CAMERA)));
            //         this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA).then((data:any) => {
            //             console.log(JSON.stringify(data));
            //             if(data.hasPermission) {
            //                console.log("have permission");
            //             }
            //         });
            //     // } catch (e) {
            //     //     console.log(e);
            //     //     console.log('Exception:' + JSON.stringify(e));
            //     // }

                
            // }

            
        } else {
            // IOS SETUP
        }
        
        
        
    }

    async calculateCloseAndOverdueBills() {
        console.log('calculateCloseAndOverdueBills');

        this.overdueBills = await this.billService.getOverdueBill();

        console.log('this.overdueBills' + JSON.stringify(this.overdueBills));

        if (this.overdueBills.length > 0){
            this.hasOverdueBills = true;
        }

        console.log('this.hasOverdueBills: ' + JSON.stringify(this.hasOverdueBills));
    }

    calculateInitialChoosedMonth() {
        if (this.choosedDate != undefined) {
        this.choosedMonth = this.choosedDate.toLocaleString('default', { month: 'long' });
        this.choosedYear = this.choosedDate.getFullYear().toString();
        }

        return this.choosedMonth;
    }

    calculateMonthString() {
        let monthNumer = (this.choosedDate.getMonth());
        
        monthNumer = (this.choosedDate.getMonth() + 1);

        let month : string = monthNumer.toString();
        if (month.length == 1) {
        month = '0' + month;
        }
        return month;
    }

    async calculateChoosedMonth() {
        await this.calculateChoosedMonthExpenses();
        await this.calculateChoosedMonthRevenues();
        
        this.choosedMonthBalance = this.choosedMonthRevenues - this.choosedMonthExpenses;

        let previousMonthBallance: number = await this.calculatePreviousMonthsBallance();

        this.formattedChoosedMonthBalance = await this.currencyPipe.transform(previousMonthBallance + this.choosedMonthBalance, 'BRL', true);

        await this.barChartMethod();
        this.barChart.update();
    }

    async calculatePreviousMonthsBallance() {
        console.log('calculatePreviousMonthsBallance');
        
        let queryDate = DatabaseUtils.getDateFormatted(this.choosedDate).slice(0, -2) + DateUtils.getCurrentMonthTotalDays(this.choosedDate).toString();

        let billsAmount : number = 0;
        let revenuesAmount : number = 0;

        let bills : Bill[] = await this.billDataBase.executeQuery('select * from bills where dueDate > date(\'1000-01-01\') and dueDate < date(\'' + queryDate + '\')');
        console.log(JSON.stringify(bills));

        if (bills != undefined) {
            bills.forEach(currentBill => {
                if (currentBill.price != null) {
                    billsAmount += currentBill.price; 
                }
            });
        }

        let revenues : Revenue[] = await this.revenueDataBase.executeQuery('select * from revenues where date > date(\'1000-01-01\') and date < date(\'' + queryDate + '\')');
        console.log(JSON.stringify(revenues));
        if (revenues != undefined) {
            revenues.forEach(currentRevenue => {
                if (currentRevenue.amount != null) {
                    revenuesAmount += currentRevenue.amount; 
                }
            });
        }

        return revenuesAmount - billsAmount;
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

        
        // if(this.billsChoosedMonth != null && this.billsChoosedMonth.length > 0)
        //   await this.localNotificationService.dueDateNotification(this.billsChoosedMonth[0]);

        console.log(this.billsChoosedMonth);

        this.choosedMonthExpenses = 0;
        if (this.billsChoosedMonth != undefined && this.billsChoosedMonth.length > 0) {
        this.billsChoosedMonth.forEach(bill => {
            if (bill.price != undefined && bill.price != null)
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
        if (this.revenuesChoosedMonth != undefined && this.revenuesChoosedMonth.length > 0) {
        this.revenuesChoosedMonth.forEach(revenue => {
            if (revenue.amount != undefined && revenue.amount != null)
            this.choosedMonthRevenues = this.choosedMonthRevenues + revenue.amount;
        });
        }
    
        this.formattedChoosedMonthRevenues = await this.currencyPipe.transform(this.choosedMonthRevenues, 'BRL', true);
    }

    navigateToListBill() {
        this.router.navigate(['/list-bill'], { replaceUrl: true });
    }
  
    navigateToInsertBill() {
        this.router.navigate(['/insert-bill'], { replaceUrl: true });
    }
  
    navigateToInsertRevenue() {
        this.router.navigate(['/insert-revenue'], { replaceUrl: true });
    }
  
    navigateToListRevenue() {
        this.router.navigate(['/list-revenue'], { replaceUrl: true });
    }

    navigateToNextMonth() {
        console.log(JSON.stringify('navigateToNextMonth'));

        this.choosedDate.setMonth(this.choosedDate.getMonth() + 1);
        this.choosedMonth = this.choosedDate.toLocaleString('default', { month: 'long' });
        this.choosedYear = this.choosedDate.getFullYear().toString();
        console.log(JSON.stringify(this.choosedYear));

        this.calculateChoosedMonth();
    }

    navigateToPreviousMonth() {
        this.choosedDate.setMonth(this.choosedDate.getMonth() - 1);
        this.choosedMonth = this.choosedDate.toLocaleString('default', { month: 'long' });
        this.choosedYear = this.choosedDate.getFullYear().toString();

        this.calculateChoosedMonth();
    }

    ngAfterViewInit () {
        this.barChartMethod();
        this.barChart.update();
    }

    barChartMethod() {
        
        if (this.barChart == null){
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
                text: 'Criar despesa',
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