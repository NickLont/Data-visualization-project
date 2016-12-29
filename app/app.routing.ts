import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import {DataConsumerPageComponent} from "./data-consumer-page/data-consumer-page";
import {BarChart} from "./bar-chart/bar-chart.component";

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'dataconsumer', component: DataConsumerPageComponent},
    {path: 'barchart', component: BarChart},
    {path: '**', redirectTo: '' }
];
export const routing = RouterModule.forRoot(appRoutes);
