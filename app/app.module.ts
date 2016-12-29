import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import {routing} from "./app.routing";
import {NavbarComponent} from "./navbar/navbar.component";
import {HomeComponent} from "./home/home.component";
import {DataConsumerPageComponent} from "./data-consumer-page/data-consumer-page";
import { BarChart } from './bar-chart/bar-chart.component';

import {DataService} from "./_services/data.service";
import {DataResolve} from "./_services/data-resolve.service";

import { ChartsModule } from 'ng2-charts/ng2-charts';


@NgModule({
    imports:      [ BrowserModule, routing, HttpModule, ChartsModule ],
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        DataConsumerPageComponent,
        BarChart
    ],
    bootstrap:    [ AppComponent ],
    providers: [ DataService, DataResolve ]
})
export class AppModule { }
