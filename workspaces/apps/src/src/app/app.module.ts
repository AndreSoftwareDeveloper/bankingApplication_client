import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DomesticTransferComponent } from './domestic-transfer/domestic-transfer.component';
import { LoginComponent } from './login/login.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { SetupDataComponent } from './setup-data/setup_data.component';

import { ApiService } from './services/api.service';


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
