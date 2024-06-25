import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { DomesticTransferComponent } from './domestic-transfer/domestic-transfer.component';
import { LoginComponent } from './login/login.component';
import { SetupDataComponent } from './setup-data/setup_data.component';

import { ApiService } from './services/api.service';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    MyAccountComponent,
    DomesticTransferComponent,
    LoginComponent,
    SetupDataComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
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
