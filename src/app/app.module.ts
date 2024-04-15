import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ApiService } from './services/api.service';
import { SetupDataModule } from './setup_data/setup_data.module';
import { CreateAccountCompanyComponent } from './create-account-company/create-account-company.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { CreateAccountComponent } from './create_account/create_account.component';
import { DomesticTransferComponent } from './domestic-transfer/domestic-transfer.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [AppComponent, CreateAccountComponent, CreateAccountCompanyComponent, MyAccountComponent, DomesticTransferComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, SetupDataModule, FormsModule],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    ApiService,
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
