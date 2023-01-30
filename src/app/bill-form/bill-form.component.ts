import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Bill } from '../../models/bill.model';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';
// import { BillService } from '../../services/bill.service';

@Component({
  selector: 'app-bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.scss'],
})
export class BillFormComponent implements OnInit {

  @Output() @Input() bill: Bill;
  @Output() upsertBillEvent = new EventEmitter<Bill>();

  @Input() isInsert : boolean | any;

  billForm: FormGroup;

  constructor(private navCtrl: NavController, private formBuilder: FormBuilder, private router: Router, private toastController: ToastController) {
    this.bill = new Bill();

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

    // this.isInsert = this.bill.primaryKey != '';
    // this.isUpdate = this.bill.primaryKey == undefined || this.bill.primaryKey == null || this.bill.primaryKey == '';

    // console.log('this.isInsert : ' + JSON.stringify(this.isInsert));
    // console.log('this.isUpdate : ' + JSON.stringify(this.isUpdate));
  }
  
  // refresh() {
  //   console.log('this.cd.detectChanges() : ' + JSON.stringify(this.cd.detectChanges()));
  //   this.cd.detectChanges();
  // }
  
  ngOnInit() {

    this.bill.name = '';
    // this.bill.dueDate = new Date();
    this.bill.price = null;
    this.bill.paid = false;
    this.bill.category = '';
    // this.bill.paymentDate = new Date();
    this.bill.reminder = false;
    this.bill.notes = '';
    // console.log('this.isInsert : ' + JSON.stringify(this.isInsert));
    // console.log('this.isUpdate : ' + JSON.stringify(this.isUpdate));
  }

  onUpsertButtonClick() {
    this.bill = this.billForm.value;

    this.upsertBillEvent.emit(this.bill);
  }

}
