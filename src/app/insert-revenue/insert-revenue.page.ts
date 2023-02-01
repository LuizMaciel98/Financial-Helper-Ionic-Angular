import { Component, OnInit } from '@angular/core';
import { Revenue } from '../../models/revenue.model';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RevenueService } from '../../services/revenue.service';
import { tap } from 'rxjs/operators';
import { Params } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RevenueFormComponent } from '../revenue-form/revenue-form.component';

@Component({
  selector: 'app-insert-revenue',
  templateUrl: './insert-revenue.page.html',
  styleUrls: ['./insert-revenue.page.scss'],
  providers: [RevenueService, RevenueFormComponent],
})
export class InsertRevenuePage implements OnInit {

  revenue: Revenue | any;

  constructor(private router: Router, private toastController: ToastController, private revenueService: RevenueService) {
    this.revenue = new Revenue('', '', '', null, '');
  }

  ngOnInit() {
  }

  async onUpsertButtonClick(revenue: Revenue) {
    await this.revenueService.addRevenue(revenue);

    this.router.navigate(['/home']);

    const toast = await this.toastController.create({
      message: 'Receita criada!',
      duration: 1500,
      position: 'top'
    });

    await toast.present();
  }

}
