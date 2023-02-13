import { Component, OnInit } from '@angular/core';
import { Bill } from '../../models/bill.model';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BillDataBase } from '../../dataBase/bill.dataBase';
import { tap } from 'rxjs/operators';
import { Params } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BillFormComponent } from '../components/bill-form/bill-form.component';

@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.page.html',
  styleUrls: ['./edit-bill.page.scss'],
  providers: [BillDataBase, BillFormComponent]
})
export class EditBillPage {

  bill: Bill;
  // primaryKey: any;

  constructor(private route: ActivatedRoute, private navCtrl: NavController, public billDataBase: BillDataBase, private toastController: ToastController) {
    console.log('EditBillPage constructor');
    this.bill = Object();
    
    // this.primaryKey = this.getPrimaryKey();
    
    this.getBillFromDatabase();
  }
  
  getPrimaryKey() {
    console.log('getPrimaryKey');
    let result;

    // this.route.params.subscribe(params => {
    //   console.log('primaryKey');
    //   console.log(params['primaryKey']);
    //   result = params['primaryKey'];
    // });

    

    // this.route.queryParams.pipe(
    //   tap((params: Params) => {
    //     console.log('params');
    //     console.log(JSON.stringify(params));
    //     result = params['primaryKey'];
    //     console.log('primaryKey');
    //     console.log(JSON.stringify(result));
    //   })
    // );
    return result;
  }

  async getBillFromDatabase() {
    console.log('getBillFromDatabase');
    let result: Bill = new Bill();

    this.route.queryParams.subscribe(params => {
      let primaryKey = params['primaryKey'];

      let query = {
        primaryKey: primaryKey
      };

      console.log('query');
      console.log(JSON.stringify(query));

      this.billDataBase.readObjects(query).then((bills) => {
        console.log('bills');
        console.log(JSON.stringify(bills));
        if(bills != undefined && bills != null){
          result = bills[0] as Bill;
          this.bill = result;
          console.log(result);
          console.log(JSON.stringify(result));
        }
      });
    });
    
    return result;
  }

  async onUpsertButtonClick(bill: Bill) {

    await this.billDataBase.updateObjects(bill);

    this.navCtrl.navigateForward(['/list-bill']);

    const toast = await this.toastController.create({
      message: 'Conta atualizada!',
      duration: 1500,
      position: 'top'
    });

    await toast.present();
  }
}
