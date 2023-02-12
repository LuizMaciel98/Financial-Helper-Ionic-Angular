import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Bill } from '../models/bill.model';
import { BillRecurrent } from '../models/billRecurrent.model';
import { BillDataBase } from '../dataBase/bill.dataBase';
import { BillRecurrentDataBase } from '../dataBase/billRecurrent.dataBase';

@Injectable()
export class BillService {

    billRecurrent : BillRecurrent | any;

    monthDaysCount : number[] = [31,28,31,30,31,30,31,31,30,31,30,31,31];//LAST ONE IS JANUARY
    monthDaysLeapYear : number[] = [31,29,31,30,31,30,31,31,30,31,30,31,31];//LAST ONE IS JANUARY

    constructor(private billDataBase: BillDataBase, private billRecurrentDataBase: BillRecurrentDataBase) {}

    public async createBill(bill: Bill | any) {
        // console.log('createBill');
        // console.log(JSON.stringify(bill));
        try {

            if (bill.isRecurrent) {
                await this.createRecurrentBill(bill);
            } else {
                await this.billDataBase.createObject(bill);
            }
        } catch (error: any){
            console.error(error);
            console.error(error.stack);
            console.error(JSON.stringify(error));
        };
    } 

    private async createRecurrentBill(bill: Bill) {
        console.log('createRecurrentBill');
        let frequency: string = bill.frequency as string;
        
        this.billRecurrent = await this.billRecurrentDataBase.createObject(new BillRecurrent('', frequency));
        
        // console.log(JSON.stringify(this.billRecurrent));
        
        bill.billRecurrent = this.billRecurrent.insertId;
        
        // console.log(JSON.stringify(bill.billRecurrent));
        
        await this.createBillsForOneYear(bill, frequency);
    }
    
    private async createBillsForOneYear(bill: Bill, recurrency: string) {
        console.log('createBillsForOneYear');
        console.log('recurrency: ' + recurrency);
        console.log('bill: ' + bill);
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

        console.log('listBills.length: ' + JSON.stringify(listBills.length));
        console.log('listBills: ' + JSON.stringify(listBills));

        
        for (let i = 0; i < listBills.length; i ++) {
            console.log('Insert I: ' + i);
            console.log(JSON.stringify(listBills[i]));
            await this.billDataBase.createObject(listBills[i]);
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
        console.log('makeMonthlyList');
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
                let isLeapYear   : boolean   = currentDate.getFullYear() % 4 == 0;
            
                let currentMonthDays : number;
                let nextMonthDays    : number;

                if (isLeapYear) {
                    currentMonthDays = this.monthDaysLeapYear[currentMonth];
                    nextMonthDays = this.monthDaysLeapYear[currentMonth + 1];
                } else {
                    currentMonthDays = this.monthDaysCount[currentMonth];
                    nextMonthDays = this.monthDaysCount[currentMonth + 1];
                }

                let newDueDate : Date;
                
                if (startingDateDay <= nextMonthDays) {
                    console.log('startingDateDay <= nextMonthDays');
                    let auxauxDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
                    // console.log('auxauxDate: ' + auxauxDate);
                    newDueDate = new Date (auxauxDate.getFullYear(), auxauxDate.getMonth(), startingDateDay);
                    // console.log('newDueDate: ' + newDueDate);
                }
                else if (currentMonthDays >= nextMonthDays) {
                    console.log('currentMonthDays >= nextMonthDays');
                    let auxauxDate = new Date(currentDate.setDate(currentDate.getDate() + nextMonthDays));
                    // console.log('auxauxDate: ' + auxauxDate);
                    newDueDate = new Date (auxauxDate.getFullYear(), auxauxDate.getMonth(), nextMonthDays);
                    // console.log('newDueDate: ' + newDueDate);
                } else {
                    console.log('else');
                    let auxYear = currentDate.getFullYear();
                    console.log('auxYear: ' + auxYear);
                    let auxMonth = currentDate.getMonth();
                    console.log('auxMonth: ' + auxMonth);
                    let auxDay = currentDate.getDate();
                    console.log('auxDay: ' + auxDay);
                    
                    console.log('currentDate: ' + currentDate);
                    newDueDate = new Date (currentDate.setMonth(auxMonth + 1));

                    currentDate = new Date(newDueDate);
                    console.log('newDueDate: ' + newDueDate);
                }
                
                let auxBill: Bill = this.makeBill(bill);
                auxBill.dueDate = newDueDate;
                console.log('auxBill:' + JSON.stringify(auxBill));
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
                console.log('newDueDate:' + JSON.stringify(newDueDate));
                let auxBill: Bill = this.makeBill(bill);
                auxBill.dueDate = newDueDate;
                auxListBill.push(auxBill);
            }
        }

        return auxListBill; 
    }

    private makeBill(bill: Bill) {
        console.log('makeBill');
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
        
        // console.log('auxBill' + JSON.stringify(auxBill));
        return auxBill;
    }
}