import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Bill } from '../models/bill.model';
import { BillRecurrent } from '../models/billRecurrent.model';
import { BillDataBase } from '../dataBase/bill.dataBase';
// import { BillRecurrentDataBase } from '../dataBase/billRecurrent.dataBase';

@Injectable()
export class BillService {
    
    constructor(private billDataBase: BillDataBase, private billRecurrentDataBase) {}

    public async createSimpleBill(bill: Bill | any){
        await this.billDataBase.addObject(bill);
    }
    
    public async createRecurrentBill(billRecurrent: BillRecurrent | any, bill: Bill | any) {
        
        // await this.billRecurrentDataBase.addObject(billRecurrent);

        
        
        await this.billDataBase.addObject(bill);
    }

}