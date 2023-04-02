import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: '**',
    redirectTo: '',
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
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'define-objectives',
    loadChildren: () => import('./define-objectives/define-objectives.module').then( m => m.DefineObjectivesPageModule)
  },
  {
    path: 'investments-simulation',
    loadChildren: () => import('./investments-simulation/investments-simulation.module').then( m => m.InvestmentsSimulationPageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then( m => m.ReportsPageModule)
  },
  {
    path: 'revenues-list-view',
    loadChildren: () => import('./revenues-list-view/revenues-list-view.module').then( m => m.RevenuesListViewPageModule)
  },
  {
    path: 'bills-list-view',
    loadChildren: () => import('./bills-list-view/bills-list-view.module').then( m => m.BillsListViewPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
