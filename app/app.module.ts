import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule }    from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent }  from './app.component';
import {routing} from "./app.routing";
import {NavbarComponent} from "./navbar/navbar.component";
import {HomeComponent} from "./home/home.component";
import {DataConsumerPageComponent} from "./data-consumer-page/data-consumer-page";
import { LoginComponent } from './login/login.component';
import {BarChartComponent} from "./bar-chart/bar-chart.component";
import {ChartsModule} from 'ng2-charts';

import {DataService} from "./_services/data.service";
import { AuthenticationService} from './_services/authentication.service';
import { AuthGuard } from './_guards/auth.guard';
import {NavBarService} from './_services/navBarService.service';


@NgModule({
    imports:[
        BrowserModule,
        routing,
        HttpModule,
        FormsModule,
        NgbModule.forRoot(),
        ChartsModule
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        DataConsumerPageComponent,
        LoginComponent,
        BarChartComponent
    ],
    providers: [
        DataService,
        AuthenticationService,
        AuthGuard,
        NavBarService
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
