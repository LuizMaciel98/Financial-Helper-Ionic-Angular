import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Revenue } from '../../../models/revenue.model';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-revenue-form',
  templateUrl: './revenue-form.component.html',
  styleUrls: ['./revenue-form.component.scss'],
})
export class RevenueFormComponent implements OnInit {
  
  @Output() @Input() revenue: Revenue;
  @Output() upsertBillEvent = new EventEmitter<Revenue>();

  @Input() isInsert : boolean | any;

  revenueForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.revenue = new Revenue('', '', '', null, '');

    this.revenueForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {}

  onUpsertButtonClick() {
    this.revenue = this.revenueForm.value;

    this.upsertBillEvent.emit(this.revenue);
  }

}
