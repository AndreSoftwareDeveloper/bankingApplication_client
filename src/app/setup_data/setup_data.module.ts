import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupDataComponent } from './setup_data.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SetupDataComponent],
  imports: [CommonModule, IonicModule.forRoot(), FormsModule],
  exports: [SetupDataComponent],
})
export class SetupDataModule { }
