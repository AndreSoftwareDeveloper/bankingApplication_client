import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SetupDataModule } from './setup_data/setup_data.module';
import { SetupDataComponent } from './setup_data/setup_data.component';
import { CreateAccountComponent } from './create_account/create_account.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { CreateAccountCompanyComponent } from './create-account-company/create-account-company.component';
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
    component: CreateAccountComponent
  },

  {
    path: 'create_account_company',
    component: CreateAccountCompanyComponent
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
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    SetupDataModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
