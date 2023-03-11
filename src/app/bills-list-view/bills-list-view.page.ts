import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-bills-list-view',
  templateUrl: './bills-list-view.page.html',
  styleUrls: ['./bills-list-view.page.scss'],
})
export class BillsListViewPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  navigateToInsertBill() {
    this.navCtrl.navigateRoot('insert-bill');
    this.navCtrl.pop();
  }

}
