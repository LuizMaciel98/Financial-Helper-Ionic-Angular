import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Bill } from '../models/bill.model';
import { BillRecurrent } from '../models/billRecurrent.model';
import { BillDataBase } from '../dataBase/bill.dataBase';
import { BillRecurrentDataBase } from '../dataBase/billRecurrent.dataBase';

@Injectable()
export class BillService {

    billRecurrent : BillRecurrent | any;

    monthDaysCount : number[] = [31,28,31,30,31,30,31,31,30,31,30,31];
    monthDaysLeapYear : number[] = [31,29,31,30,31,30,31,31,30,31,30,31];

    constructor(private billDataBase: BillDataBase, private billRecurrentDataBase: BillRecurrentDataBase) {}

    public async createBill(bill: Bill | any) {
        if (bill.isRecurrent) {
            await this.createRecurrentBill(bill);
        } else {
            await this.billDataBase.createObject(bill);
        }
    } 

    private async createRecurrentBill(bill: Bill | any) {
        let recurrency = bill.recurrency;

        this.billRecurrent = await this.billRecurrentDataBase.createObject(new BillRecurrent('', recurrency));

        bill.billRecurrent = this.billRecurrent.primaryKey;

        this.createBillsForOneYear(bill);
    }

    private async createBillsForOneYear(bill: Bill) {
        let listBills: Bill[];
        listBills = [];

        listBills.push(bill);

        if (this.billRecurrent.recurrency == 'daily') {
            let startingDate: Date;

            if (bill.dueDate != null) {
                listBills.concat(this.makeDailyList(bill));
            } else if (this.billRecurrent.recurrency == 'weekly') {
                listBills.concat(this.makeWeeklyList(bill));
            } else if (this.billRecurrent.recurrency == 'monthly') {
                listBills.concat(this.makeMonthlyList(bill));
            } else if (this.billRecurrent.recurrency == 'annually') {
                listBills.concat(this.makeAnuallyList(bill, 1));
            }
        }

        listBills.forEach(currentBill => {
            this.billDataBase.createObject(currentBill);
        });
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

        console.log('Test');

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
            startingDate    = bill.dueDate;
            currentDate     = startingDate;
            startingDateDay = startingDate.getDate();

            for (let i = 1; i < 12; i++){

                let currentMonth : number    = currentDate.getMonth();
                let isLeapYear   : boolean   = currentDate.getFullYear() % 4 == 0;
            
                let currentMonthDays : number;
                let nextMonthDays    : number;

                if (isLeapYear) {
                    currentMonthDays = this.monthDaysCount[currentMonth];
                    nextMonthDays = this.monthDaysCount[currentMonth + 1];
                } else {
                    currentMonthDays = this.monthDaysLeapYear[currentMonth];
                    nextMonthDays = this.monthDaysLeapYear[currentMonth + 1];
                }

                let newDueDate : Date;
                
                if (startingDateDay <= nextMonthDays) {
                    let auxauxDate = new Date(currentDate.setMonth(startingDate.getMonth() + 1));
                    newDueDate = new Date (auxauxDate.getFullYear(), auxauxDate.getMonth(), startingDateDay);
                }
                else if (currentMonthDays >= nextMonthDays) {
                    let auxauxDate = new Date(currentDate.setDate(currentDate.getDate() + nextMonthDays));
                    newDueDate = new Date (auxauxDate.getFullYear(), auxauxDate.getMonth(), nextMonthDays);
                } else {
                    newDueDate = new Date (currentDate.setMonth(startingDate.getMonth() + 1));
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
}