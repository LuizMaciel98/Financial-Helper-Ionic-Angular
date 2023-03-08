import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Bill } from '../../../models/bill.model';
import { NavController } from '@ionic/angular';
import { BillService } from '../../../services/bill.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, RequiredValidator } from '@angular/forms';
import { BillDataBase } from '../../../dataBase/bill.dataBase';

@Component({
    selector: 'app-overdue-modal',
    templateUrl: './overdue-modal.component.html',
    styleUrls: ['./overdue-modal.component.scss'],
    providers: [BillService],
})
export class OverdueModalComponent implements OnInit {

    @Output() @Input() overdueBills: Bill[] | any;

    hasOverdueBills: boolean = false;

    beignPaidBills: number[] = [];
    paidBills: number[] = [];

    constructor(private navCtrl: NavController, private toastController: ToastController, private billService: BillService, public billDataBase: BillDataBase,) {

    }

    ngOnInit() {
        console.log();
    }

    async payBill(primaryKey: any) {

        let bill : Bill = new Bill();

        this.beignPaidBills.push(primaryKey);

        for (let i = 0; i < this.overdueBills.length; i++) {
            let currentBill: Bill = this.overdueBills[i];

            
            console.log("currentBill: " + JSON.stringify(currentBill));
            if (currentBill.primaryKey == primaryKey) {
                this.overdueBills[i].paid = true;
                bill = currentBill;
                bill.paid = true;
            }
        }
        
        console.log("this.overdueBills: " + JSON.stringify(this.overdueBills));
        

        this.billDataBase.updateObjects(bill).then(result => {
            console.log(JSON.stringify(result));
            this.beignPaidBills.splice(this.beignPaidBills.indexOf(primaryKey),1);
            this.paidBills.push(primaryKey);
        });
        
    }

    loading(primaryKey: any) {
        let result: boolean = false;

        let index = this.beignPaidBills.indexOf(primaryKey);
        console.log(JSON.stringify(index));
        
        if (index != null && index != undefined && index != -1) {
            result = true;
        }

        return result;
    }

    payButtonAvailable(primaryKey: any) {
        let result: boolean = true;

        let currentBill: Bill = new Bill();
        for (let i = 0; i < this.overdueBills.length; i++) {
            currentBill = this.overdueBills[i];
        }

        let beignPaidIndex = this.beignPaidBills.indexOf(primaryKey);
        let paidIndex = this.paidBills.indexOf(primaryKey);
        
        if (beignPaidIndex != null && beignPaidIndex != undefined && beignPaidIndex != -1) {
            result = false;
        } else {
            if (paidIndex != null && paidIndex != undefined && paidIndex != -1) {
                result = false;
            }
        }

        return result;
    }

    isPaid(primaryKey: any) {
        let result: boolean = false;

        let index = this.paidBills.indexOf(primaryKey);
        
        if (index != null && index != undefined && index != -1) {
            result = true;
        }
        
        return result;
    }

}
