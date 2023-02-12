import { Component, OnInit } from '@angular/core';
import { Bill } from '../../models/bill.model';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BillService } from '../../services/bill.service';
import { tap } from 'rxjs/operators';
import { Params } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BillFormComponent } from '../bill-form/bill-form.component';

@Component({
    selector: 'app-insert-bill',
    templateUrl: './insert-bill.page.html',
    styleUrls: ['./insert-bill.page.scss'],
    providers: [BillService, BillFormComponent],
})
export class InsertBillPage {

  bill: Bill | any;



  constructor(private router: Router, private toastController: ToastController, private billService: BillService) {
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

  async ngOnInit() {
  }

  async onUpsertButtonClick(bill: Bill) {

      await this.billService.createBill(bill);

      // await this.billDataBase.createObject(bill);

      this.router.navigate(['/home']);

      const toast = await this.toastController.create({
          message: 'Conta criada!',
          duration: 1500,
          position: 'top'
      });

      await toast.present();
  }
}