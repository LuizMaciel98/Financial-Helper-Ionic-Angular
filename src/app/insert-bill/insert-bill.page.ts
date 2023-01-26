import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Bill } from '../../models/bill.model';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

import { BillService } from '../../services/bill.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-insert-bill',
  templateUrl: './insert-bill.page.html',
  styleUrls: ['./insert-bill.page.scss'],
  providers: [BillService],
})
export class InsertBillPage {

  billForm: FormGroup;


  constructor(private storage: Storage, private formBuilder: FormBuilder, private router: Router, private toastController: ToastController, private billService: BillService) {
    this.billForm = this.formBuilder.group({
      name: new FormControl(''),
      dueDate: new FormControl(''),
      price: new FormControl(''),
      paid: new FormControl(false),
      category: new FormControl(''),
      paymentDate: new FormControl(''),
      reminder: new FormControl(false),
      notes: new FormControl('')
    });

  }

  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    // await this.storage.create();

  }

  async saveBill() {
    const bill: Bill = this.billForm.value;
    // await this.storage.set('bill'+new Date().getTime(), bill);
    // this.getAllBills();

    await this.billService.addBill(bill);

    this.router.navigate(['/home']);

    const toast = await this.toastController.create({
      message: 'Conta criada!',
      duration: 1500,
      position: 'top'
    });

    await toast.present();
  }

  // async getAllBills() {
  //   const keys = await this.storage.keys();
  //   for (const key of keys) {
  //       const value = await this.storage.get(key);
  //       console.log(value);
  //   }
  // }

}