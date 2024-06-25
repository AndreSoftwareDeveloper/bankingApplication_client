import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { SetupDataComponent } from './setup-data/setup_data.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'set_up_data',
    component: SetupDataComponent
  },

  {
    path: 'create_account',
    loadChildren: () => import('./create-account/create-account.module').then(m => m.CreateAccountModule)
  },

  {
    path: 'my_account',
    component: MyAccountComponent
  },  

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
