import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-global-header',
    templateUrl: './global-header.component.html',
    styleUrls: ['./global-header.component.scss'],
})
export class GlobalHeaderComponent implements OnInit {

  constructor(private navCtrl: NavController) { }

    navigateToHome() {
        this.navCtrl.navigateRoot('home');
        this.navCtrl.pop();
    }

    navigateToBillsListView() {
        this.navCtrl.navigateRoot('bills-list-view');
        this.navCtrl.pop();
    }
    
    navigateToListBill() {
        this.navCtrl.navigateRoot('list-bill');
        this.navCtrl.pop();
    }
    
    navigateToInsertBill() {
        this.navCtrl.navigateRoot('insert-bill');
        this.navCtrl.pop();
    }

    navigateToRevenuesListView() {
        this.navCtrl.navigateRoot('revenues-list-view');
        this.navCtrl.pop();
    }
    
    navigateToListRevenue() {
        this.navCtrl.navigateRoot('list-revenue');
        this.navCtrl.pop();
    }

    navigateToInsertRevenue() {
        this.navCtrl.navigateRoot('insert-revenue');
        this.navCtrl.pop();
    }
    
    
    navigateToSettings() {
        this.navCtrl.navigateRoot('settings');
        this.navCtrl.pop();
    }

    navigateToDefineObjectives() {
        this.navCtrl.navigateRoot('define-objectives');
        this.navCtrl.pop();
    }

    navigateToInvestmentsSimulation() {
        this.navCtrl.navigateRoot('investments-simulation');
        this.navCtrl.pop();
    }
    
    navigateToReports() {
        this.navCtrl.navigateRoot('reports');
        this.navCtrl.pop();
    }

    ngOnInit() {
        console.log('');
    }

}
