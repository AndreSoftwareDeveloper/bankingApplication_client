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

@NgModule({
  declarations: [AppComponent, CreateAccountCompanyComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, SetupDataModule, FormsModule],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    ApiService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
