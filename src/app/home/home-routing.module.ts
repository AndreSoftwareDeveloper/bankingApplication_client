import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataDisplayComponent } from '../data-display/data-display.component';
import { SetupDataComponent } from '../setup_data/setup_data.component';

const routes: Routes = [
  {
    path: '',
    component: DataDisplayComponent
  },
  {
    path: 'set_up_data',
    component: SetupDataComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
