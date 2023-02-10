import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Bill } from '../models/bill.model';
import { BillRecurrent } from '../models/billRecurrent.model';
import { BillDataBase } from '../dataBase/bill.dataBase';
import { BillRecurrentDataBase } from '../dataBase/billRecurrent.dataBase';

@Injectable()
export class BillService {

    billRecurrent : BillRecurrent | any;

    constructor(private billDataBase: BillDataBase, private billRecurrentDataBase: BillRecurrentDataBase) {}

    public async createSimpleBill(bill: Bill | any){
        await this.billDataBase.createObject(bill);
    }

    public async createRecurrentBill(recurrency: string, bill: Bill | any) {
        recurrency = recurrency.toLowerCase();

        this.billRecurrent = await this.billRecurrentDataBase.createObject(new BillRecurrent('', recurrency));

        this.createBillsForOneYear(bill);

        await this.billDataBase.createObject(bill);
    }

    private async createBillsForOneYear(bill: Bill) {
        if(this.billRecurrent.recurrency == 'daily') {
            //Creates one per day for the following year(365 days)

            bill.dueDate;

            // for(){

            // }
        } else if (this.billRecurrent.recurrency == 'weekly') {
            //Creates one per week for the following year(365 days)
        } else if (this.billRecurrent.recurrency == 'monthly') {
            //Creates one per month for the following year(365 days)
        } else if (this.billRecurrent.recurrency == 'annually') {
            //Creates one per year for the following year(365 days)
        }
    }

}