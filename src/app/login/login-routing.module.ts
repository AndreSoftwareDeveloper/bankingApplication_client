import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from '../create_account/create_account.component';
import { SetupDataComponent } from '../setup_data/setup_data.component';
import { LoginPage } from './login.page';
import { MyAccountComponent } from '../my-account/my-account.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },

  {
    path: 'sign_up',
    component: CreateAccountComponent
  },

  {
    path: 'set_up_data',
    component: SetupDataComponent
  },

  {
    path: 'my_account',
    component: MyAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginPageRoutingModule {}
