import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Bill } from '../../models/bill.model';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-list-bill',
  templateUrl: './list-bill.page.html',
  styleUrls: ['./list-bill.page.scss'],
})
export class ListBillPage implements OnInit {

  bills: Bill[];

  showListItems = true;
  showTableItems = false;
  defaultListView = 'List';
  
  constructor(private storage: Storage, private navCtrl: NavController) {
    this.bills = [];
  }

  async ngOnInit() {
    await this.storage.create();
    const keys = await this.storage.keys();
    console.log(keys);
    for (const key of keys) {
        const value = await this.storage.get(key);
        value.primaryKey = key;
        console.log(value);
        this.bills.push(value);
    }
  }

  changeListView(event: any){
    let value = event.detail.value;
    if(value == 'List'){
      this.showListItems = true;
      this.showTableItems = false;
    } else {
      this.showListItems = false;
      this.showTableItems = true;
    }
  }

  editBill(primaryKey: any) {
    console.log(primaryKey);
    this.navCtrl.navigateForward(['/edit-bill'], {
      queryParams: { primaryKey }
    });
  }

}
