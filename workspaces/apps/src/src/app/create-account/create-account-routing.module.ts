import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateAccountCompanyComponent } from './create-account-company/create-account-company.component';
import { CreateAccountIndividualComponent } from './create-account-individual/create-account-individual.component';

const routes: Routes = [
  {
    path: 'individual',
    component: CreateAccountIndividualComponent
  },

  {
    path: 'company',
    component: CreateAccountCompanyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateAccountRoutingModule { }
