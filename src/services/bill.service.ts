import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Bill } from '../models/bill.model';
import { BillRecurrent } from '../models/billRecurrent.model';
import { BillDataBase } from '../dataBase/bill.dataBase';
import { BillRecurrentDataBase } from '../dataBase/billRecurrent.dataBase';
import { LocalNotificationService } from '../services/localNotification.service';

@Injectable()
export class BillService {

    billRecurrent : BillRecurrent | any;

    monthDaysCount : number[] = [31,28,31,30,31,30,31,31,30,31,30,31,31];//13 MONTHS LAST ONE IS JANUARY
    monthDaysLeapYear : number[] = [31,29,31,30,31,30,31,31,30,31,30,31,31];//13 MONTHS LAST ONE IS JANUARY

    constructor(
        private billDataBase: BillDataBase, 
        private billRecurrentDataBase: BillRecurrentDataBase, 
        private localNotificationService: LocalNotificationService
    ) {}

    public getMonthTotalDays(date: Date) {
        let result: number;

        if (this.isLeapYear(date)) {
            result = this.monthDaysLeapYear[date.getMonth()];
        } else {
            result = this.monthDaysCount[date.getMonth()];
        }
        return result;
    }

    public async getOverdueBill() {
        console.log('getOverdueBill');
        let overdueBills: Bill[] = [];
        // try {
        return await this.billDataBase.executeQuery('SELECT * FROM bills WHERE dueDate < DATE(\'now\') AND paid = \'false\'');
        // } catch (exception) {
        //     console.log(JSON.stringify(exception));
        // }
    }

    public async createBill(bill: Bill | any) {
        try {
            if (bill.isRecurrent) {
                await this.createRecurrentBill(bill);
            } else {
                await this.CreateBillCommonInstructions(bill);
            }
        } catch (error: any) {
            console.error(error);
            console.error(error.stack);
            console.error(JSON.stringify(error));
        };
    } 

    private async createRecurrentBill(bill: Bill) {
        let frequency: string = bill.frequency as string;
        
        this.billRecurrent = await this.billRecurrentDataBase.createObject(new BillRecurrent(null , frequency));
        
        bill.billRecurrent = this.billRecurrent.insertId;
        
        await this.createBillsForOneYear(bill, frequency);
    }
    
    private async createBillsForOneYear(bill: Bill, recurrency: string) {
        let listBills: Bill[] = [];
        let auxListBill: Bill[] = [];
        let auxBill: Bill = this.makeBill(bill);;

        listBills.push(auxBill);

        if (bill.dueDate != null) {
            let startingDate: Date;

            if (recurrency == 'daily') {
                auxListBill = this.makeDailyList(bill);

            } else if (recurrency == 'weekly') {
                auxListBill = this.makeWeeklyList(bill);

            } else if (recurrency == 'monthly') {
                auxListBill = this.makeMonthlyList(bill);

            } else if (recurrency == 'annually') {
                auxListBill = this.makeAnuallyList(bill, 1);

            }
        }

        auxListBill.forEach(currentBill => {
            listBills.push(currentBill);
        });

        
        for (let i = 0; i < listBills.length; i ++) {
            await this.CreateBillCommonInstructions(listBills[i]);
        }
    }

    private makeDailyList(bill: Bill) {
        let startingDate: Date = bill.dueDate as Date;
        let auxListBill: Bill[] = [];

        for (let i = 1; i < 365; i++) {
            let newDueDate : Date;
            newDueDate = new Date (startingDate.setDate(startingDate.getDate() + i));

            let auxBill: Bill = this.makeBill(bill);
            auxBill.dueDate = newDueDate;
            auxListBill.push(auxBill);
        }

        return auxListBill;
    }

    private makeWeeklyList(bill: Bill) {
        let startingDate: Date;
        let auxListBill: Bill[] = [];

        if (bill.dueDate != null) {
            startingDate = bill.dueDate;
        
            for (let i = 1; i < 365; i++) {
                if (i % 7 == 0) {
                    let newDueDate : Date;
                    newDueDate = new Date (startingDate.setDate(startingDate.getDate() + i));

                    let auxBill: Bill = this.makeBill(bill);
                    auxBill.dueDate = newDueDate;
                    auxListBill.push(auxBill);
                }
            }
        }

        return auxListBill;
    }

    private makeMonthlyList(bill: Bill) {
        let startingDate    : Date;
        let currentDate     : Date;
        let startingDateDay : number;
        let auxListBill: Bill[] = [];

        if (bill.dueDate != null) {
            startingDate    = new Date(bill.dueDate);
            currentDate     = new Date(startingDate);
            startingDateDay = startingDate.getDate();

            for (let i = 0; i < 11; i++) {
                let currentMonth : number    = currentDate.getMonth();
                // let isLeapYear   : boolean   = currentDate.getFullYear() % 4 == 0;
            
                let currentMonthDays : number;
                let nextMonthDays    : number;

                if (this.isLeapYear(currentDate)) {
                    currentMonthDays = this.monthDaysLeapYear[currentMonth];
                    nextMonthDays = this.monthDaysLeapYear[currentMonth + 1];
                } else {
                    currentMonthDays = this.monthDaysCount[currentMonth];
                    nextMonthDays = this.monthDaysCount[currentMonth + 1];
                }

                let newDueDate : Date;

                if (startingDateDay <= nextMonthDays) {
                    let auxauxDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
                    newDueDate = new Date (auxauxDate.getFullYear(), auxauxDate.getMonth(), startingDateDay);
                }
                else if (currentMonthDays >= nextMonthDays) {
                    let auxauxDate = new Date(currentDate.setDate(currentDate.getDate() + nextMonthDays));
                    newDueDate = new Date (auxauxDate.getFullYear(), auxauxDate.getMonth(), nextMonthDays);
                } else {
                    let auxYear = currentDate.getFullYear();
                    let auxMonth = currentDate.getMonth();
                    let auxDay = currentDate.getDate();
                    
                    newDueDate = new Date (currentDate.setMonth(auxMonth + 1));

                    currentDate = new Date(newDueDate);
                }
                
                let auxBill: Bill = this.makeBill(bill);
                auxBill.dueDate = newDueDate;
                auxListBill.push(auxBill);
            }
        }

        return auxListBill;
    }

    private makeAnuallyList(bill: Bill, howManyYears: number) {
        let dueDate = bill.dueDate as Date;
        let newDueDate: Date;
        let auxListBill: Bill[] = [];

        if (dueDate != null) {
            for (let i = 0; i< howManyYears; i++) {
                newDueDate = new Date(dueDate.getFullYear() + 1, dueDate.getMonth(), dueDate.getDate());
                let auxBill: Bill = this.makeBill(bill);
                auxBill.dueDate = newDueDate;
                auxListBill.push(auxBill);
            }
        }

        return auxListBill; 
    }

    private makeBill(bill: Bill) {
        let auxBill: Bill = new Bill();
        auxBill.name            = bill.name;
        auxBill.dueDate         = bill.dueDate;
        auxBill.price           = bill.price;
        auxBill.paid            = bill.paid;
        auxBill.category        = bill.category;
        auxBill.paymentDate     = bill.paymentDate;
        auxBill.reminder        = bill.reminder;
        auxBill.notes           = bill.notes;
        auxBill.billRecurrent   = bill.billRecurrent;
        auxBill.frequency       = bill.frequency;
        auxBill.isRecurrent     = bill.isRecurrent;

        return auxBill;
    }

    private async CreateBillCommonInstructions(bill: Bill) {
        await this.billDataBase.createObject(bill).then(result => {

            console.log(JSON.stringify(result));

            bill.primaryKey = result.insertId;

            this.localNotificationService.createNotification(bill, 'dueDate');
            this.localNotificationService.createNotification(bill, 'overdue');
        });
    }

    private isLeapYear(date: Date){
        return date.getFullYear() % 4 == 0;
    }
}