import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Revenue } from '../../models/revenue.model';
import { RevenueService } from '../../services/revenue.service';

@Component({
  selector: 'app-list-revenue',
  templateUrl: './list-revenue.page.html',
  styleUrls: ['./list-revenue.page.scss'],
})
export class ListRevenuePage implements OnInit {

  revenues: Revenue[];

  showListItems = true;
  showTableItems = false;
  defaultListView = 'List';
  
  constructor(private navCtrl: NavController, public revenueService: RevenueService) {
    this.revenues = [];
    this.loadRevenues();
  }

  async ngOnInit() {
    this.loadRevenues();
  }

  ionViewWillEnter() {
    this.loadRevenues();
  }

  async loadRevenues() {
    this.revenueService.getRevenues('All').then(revenues => this.revenues = revenues as Revenue[]);
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

  editRevenue(primaryKey: any) {
    console.log('editRevenue');
    console.log(primaryKey);
    console.log(JSON.stringify(primaryKey));
    this.navCtrl.navigateForward(['/edit-revenue'], {
      queryParams: { primaryKey: primaryKey }
    });
  }

}
