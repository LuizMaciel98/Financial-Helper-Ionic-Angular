import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeCalendarPage } from './home-calendar.page';

const routes: Routes = [
  {
    path: '',
    component: HomeCalendarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeCalendarPageRoutingModule {}
