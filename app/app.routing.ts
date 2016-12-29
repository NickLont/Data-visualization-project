import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import {DataConsumerPageComponent} from "./data-consumer-page/data-consumer-page";
import {BarChart} from "./bar-chart/bar-chart.component";
import {DataResolve} from "./_services/data-resolve.service";

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'dataconsumer', component: DataConsumerPageComponent},
    {path: 'barchart',
     component: BarChart,
     resolve : {
        measurements: DataResolve
     }

    },
    {path: '**', redirectTo: '' }
];
export const routing = RouterModule.forRoot(appRoutes);
