import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import {DataConsumerPageComponent} from "./data-consumer-page/data-consumer-page";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'dataconsumer', component: DataConsumerPageComponent},
  { path: '**', redirectTo: '' }
  ];
export const routing = RouterModule.forRoot(appRoutes);
