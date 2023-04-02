import { Component, OnInit } from '@angular/core';

// import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

import { getAuth } from '@angular/fire/auth';
import { AuthService } from 'src/services/auth.service';



@Component({
    selector: 'app-global-header',
    templateUrl: './global-header.component.html',
    styleUrls: ['./global-header.component.scss'],
})
export class GlobalHeaderComponent implements OnInit {
    
    auth = getAuth();
    user = this.auth.currentUser;

    displayName : string | any;

    constructor(private navCtrl: NavController, private authService: AuthService) {
        if (this.user) {
            console.log('firebase');
            console.log(this.user);
            console.log(JSON.stringify(this.user));
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User

            if (this.user.displayName == null) {
                this.displayName = this.user.email;
            } else {                
                this.displayName = this.user.displayName;
            }


            // console.log(displayName);
            // ...
        } else {
        // No user is signed in.
        }
    }


    

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

    async logout() {
        console.log('logout');
        await this.authService.logout();
        this.navCtrl.navigateRoot('login');
        this.navCtrl.pop();
    }

    ngOnInit() {
        console.log('');
    }

}
