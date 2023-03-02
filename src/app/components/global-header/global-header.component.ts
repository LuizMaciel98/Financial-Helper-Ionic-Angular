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
    
    navigateToListBill() {
        this.navCtrl.navigateRoot('list-bill');
        this.navCtrl.pop();
        // this.router.navigate(['/list-bill']);
    }
    
    navigateToInsertBill() {
        this.navCtrl.navigateRoot('insert-bill');
        this.navCtrl.pop();
        // this.router.navigate(['/insert-bill']);
    }
    
    navigateToInsertRevenue(){
        this.navCtrl.navigateRoot('insert-revenue');
        this.navCtrl.pop();
        // this.router.navigate(['/insert-revenue']);
    }
    
    navigateToListRevenue(){
        this.navCtrl.navigateRoot('list-revenue');
        this.navCtrl.pop();
    }
    
    navigateToSettings(){
        this.navCtrl.navigateRoot('settings');
        this.navCtrl.pop();
    }

  ngOnInit() {}

}
