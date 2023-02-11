import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Bill } from '../../models/bill.model';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.bill = new Bill();

    
    this.billForm = this.formBuilder.group({
      name: new FormControl(''),
      dueDate: new FormControl(''),
      price: new FormControl(''),
      paid: new FormControl(false),
      category: new FormControl(''),
      paymentDate: new FormControl(''),
      reminder: new FormControl(false),
      notes: new FormControl(''),
      isRecurrent: new FormControl(''),
      frequency: new FormControl('')
    });
  }
  
  ngOnInit() {

    this.bill.name = '';
    // this.bill.dueDate = new Date();
    this.bill.price = null;
    this.bill.paid = false; 
    this.bill.category = '';
    // this.bill.paymentDate = new Date();
    this.bill.reminder = false;
    this.bill.notes = '';
  }

  onUpsertButtonClick() {
    this.bill = this.billForm.value;

    this.upsertBillEvent.emit(this.bill);
  }

  testFunction(event: any) {
    console.log(event);
  }

}
