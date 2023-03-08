import { Component, OnInit } from '@angular/core';
import { Bill } from '../../models/bill.model';
import { NavController } from '@ionic/angular';
import { BillService } from '../../services/bill.service';
import { ToastController } from '@ionic/angular';
import { BillFormComponent } from '../components/bill-form/bill-form.component';

@Component({
    selector: 'app-insert-bill',
    templateUrl: './insert-bill.page.html',
    styleUrls: ['./insert-bill.page.scss'],
    providers: [BillService, BillFormComponent],
})
export class InsertBillPage {

    bill: Bill | any;

    constructor(private navCtrl: NavController, private toastController: ToastController, private billService: BillService) {
        this.bill = new Bill();

        this.bill.name = '';
        this.bill.dueDate = null;
        this.bill.price = null;
        this.bill.paid = false;
        this.bill.category = '';
        this.bill.paymentDate = null;
        this.bill.reminder = false;
        this.bill.notes = '';
    }

    ngOnInit() {
    }

    async onUpsertButtonClick(bill: Bill) {

        await this.billService.createBill(bill);

        this.navCtrl.navigateRoot('home');
        this.navCtrl.pop();

        const toast = await this.toastController.create({
            message: 'Despesa criada!',
            duration: 1500,
            position: 'top'
        });

        await toast.present();
    }
}