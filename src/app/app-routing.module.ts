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
    path: 'insert-bill',
    loadChildren: () => import('./insert-bill/insert-bill.module').then( m => m.InsertBillPageModule)
  },
  {
    path: 'list-bill',
    loadChildren: () => import('./list-bill/list-bill.module').then( m => m.ListBillPageModule)
  },
  {
    path: 'edit-bill',
    loadChildren: () => import('./edit-bill/edit-bill.module').then( m => m.EditBillPageModule)
  },
  {
    path: 'insert-revenue',
    loadChildren: () => import('./insert-revenue/insert-revenue.module').then( m => m.InsertRevenuePageModule)
  },
  {
    path: 'list-revenue',
    loadChildren: () => import('./list-revenue/list-revenue.module').then( m => m.ListRevenuePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
