import { Component, OnInit } from '@angular/core';
import { Revenue } from '../../models/revenue.model';
import { NavController } from '@ionic/angular';
import { RevenueDataBase } from '../../dataBase/revenue.dataBase';
import { ToastController } from '@ionic/angular';
import { RevenueFormComponent } from '../components/revenue-form/revenue-form.component';

@Component({
    selector: 'app-insert-revenue',
    templateUrl: './insert-revenue.page.html',
    styleUrls: ['./insert-revenue.page.scss'],
    providers: [RevenueDataBase, RevenueFormComponent],
})
export class InsertRevenuePage implements OnInit {

    revenue: Revenue | any;

    constructor(private navCtrl: NavController, private toastController: ToastController, private revenueDataBase: RevenueDataBase) {
        this.revenue = new Revenue('', '', '', null, '');
    }

    ngOnInit() {
    }

    async onUpsertButtonClick(revenue: Revenue) {

        await this.revenueDataBase.createObject(revenue);

        this.navCtrl.navigateRoot('home');
        this.navCtrl.pop();

        const toast = await this.toastController.create({
            message: 'Receita criada!',
            duration: 1500,
            position: 'top'
        });

        await toast.present();
    }

}
