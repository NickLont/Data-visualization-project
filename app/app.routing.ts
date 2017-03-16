import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import {DataConsumerPageComponent} from "./data-consumer-page/data-consumer-page";
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './_guards/auth.guard';
import {BarChartComponent} from "./bar-chart/bar-chart.component";
import {StatBarChartsComponent} from "./stat-barcharts/stat-barcharts.component";

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'dataconsumer', component: DataConsumerPageComponent, canActivate: [AuthGuard]},
  {path: 'barchart', component: BarChartComponent, canActivate: [AuthGuard]},
  {path: 'stat-barcharts', component: StatBarChartsComponent, canActivate: [AuthGuard]},

  { path: '**', redirectTo: '', pathMatch:'full' }
  ];
export const routing = RouterModule.forRoot(appRoutes);
