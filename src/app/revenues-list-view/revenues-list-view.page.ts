import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-revenues-list-view',
    templateUrl: './revenues-list-view.page.html',
    styleUrls: ['./revenues-list-view.page.scss'],
})
export class RevenuesListViewPage implements OnInit {

    constructor(private navCtrl: NavController) { }

    ngOnInit() {
        console.log();
    }

    navigateToInsertRevenue() {
        this.navCtrl.navigateRoot('insert-revenue');
        this.navCtrl.pop();
    }

}
