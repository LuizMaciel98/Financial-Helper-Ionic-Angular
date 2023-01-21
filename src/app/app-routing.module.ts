import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home-calendar',
    loadChildren: () => import('./home-calendar/home-calendar.module').then( m => m.HomeCalendarPageModule)
  },
  {
    path: 'insert-bill',
    loadChildren: () => import('./insert-bill/insert-bill.module').then( m => m.InsertBillPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
