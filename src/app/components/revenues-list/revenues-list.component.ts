import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Revenue } from '../../../models/revenue.model';
import { RevenueDataBase } from '../../../dataBase/revenue.dataBase';

@Component({
    selector: 'app-revenues-list',
    templateUrl: './revenues-list.component.html',
    styleUrls: ['./revenues-list.component.scss'],
})
export class RevenuesListComponent implements OnInit {

    revenues: Revenue[] = [];

    showListItems = true;
    showTableItems = false;

    constructor(private navCtrl: NavController, public revenueDataBase: RevenueDataBase) {
        this.loadRevenues();
    }

    async ngOnInit() {
        this.loadRevenues();
    }
    
    ionViewWillEnter() {
        this.loadRevenues();
    }
    
    async loadRevenues() {
        this.revenueDataBase.readObjects('All').then(revenues => this.revenues = revenues as Revenue[]);
    }
    
    changeListView(event: any){
        let value = event.detail.value;
        if (value == 'List'){
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
