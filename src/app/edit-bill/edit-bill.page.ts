import { Component, OnInit } from '@angular/core';
import { Bill } from '../../models/bill.model';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.page.html',
  styleUrls: ['./edit-bill.page.scss'],
})
export class EditBillPage {

  bill: Bill;
  constructor(private storage: Storage, private route: ActivatedRoute, private navCtrl: NavController) {
    this.bill = Object();
    
    this.route.queryParams.subscribe((params) => {
      let primaryKey = params['primaryKey'];
      console.log(primaryKey);
      this.storage.get(primaryKey).then((bill) => {
        console.log(bill);
        this.bill = bill;
      });
    });
  }

  updateBill() {
    this.route.queryParams.subscribe((params) => {
      let primaryKey = params['primaryKey'];
      this.storage.set(primaryKey, this.bill).then(() => {
        console.log('Bill updated!');
      });
    });

    this.navCtrl.navigateForward(['/list-bill']);
  }
}
