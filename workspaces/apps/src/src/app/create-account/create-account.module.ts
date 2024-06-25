import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CreateAccountRoutingModule } from './create-account-routing.module';
import { CreateAccountCompanyComponent } from './create-account-company/create-account-company.component';
import { CreateAccountIndividualComponent } from './create-account-individual/create-account-individual.component';

@NgModule({
  declarations: [
    CreateAccountIndividualComponent,
    CreateAccountCompanyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateAccountRoutingModule
  ]
})
export class CreateAccountModule { }
