import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SetupDataModule } from './setup_data/setup_data.module';
import { SetupDataComponent } from './setup_data/setup_data.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'set_up_data',
    component: SetupDataComponent
  },
  {
    path: '',
    redirectTo: 'home',
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
