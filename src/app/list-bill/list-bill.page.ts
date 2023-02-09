import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Bill } from '../../models/bill.model';
import { BillDataBase } from '../../dataBase/bill.dataBase';

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
  
  constructor(private navCtrl: NavController, public billDataBase: BillDataBase) {
    this.bills = [];
    this.loadBills();
  }

  async ngOnInit() {
    this.loadBills();
  }

  ionViewWillEnter() {
    this.loadBills();
  }

  async loadBills() {
    this.billDataBase.readObjects('All').then(bills => this.bills = bills as Bill[]);
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
    console.log('editBill');
    console.log(primaryKey);
    console.log(JSON.stringify(primaryKey));
    this.navCtrl.navigateForward(['/edit-bill'], {
      queryParams: { primaryKey: primaryKey }
    });
  }

}
