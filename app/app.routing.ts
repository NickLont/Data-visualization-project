import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import {DataConsumerPageComponent} from "./data-consumer-page/data-consumer-page";
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './_guards/auth.guard';
import {ProvidersComponent} from "./providers/providers.component";
import {StatBarChartsComponent} from "./stat-barcharts/stat-barcharts.component";
import {NetworkStatsComponent} from "./networkStats/networkStats.component";
import {OSStatsComponent} from "./osStats/osStats.component";
import {VendorStatsComponent} from "./vendorStats/vendorStats.component";
import {MapsComponent} from './maps/maps.component';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'dataconsumer', component: DataConsumerPageComponent, canActivate: [AuthGuard]},
  {path: 'providers', component: ProvidersComponent, canActivate: [AuthGuard]},
  {path: 'stat-barcharts', component: StatBarChartsComponent, canActivate: [AuthGuard]},
  {path: 'networks', component: NetworkStatsComponent, canActivate: [AuthGuard]},
  {path: 'osStats', component: OSStatsComponent, canActivate: [AuthGuard]},
  {path: 'vendorStats', component: VendorStatsComponent, canActivate: [AuthGuard]},
  {path: 'maps', component: MapsComponent, canActivate: [AuthGuard]},

  { path: '**', redirectTo: 'home', pathMatch:'full' }
  ];
export const routing = RouterModule.forRoot(appRoutes);
