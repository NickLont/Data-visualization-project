import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule }    from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent }  from './app.component';
import {routing} from "./app.routing";
import {NavbarComponent} from "./navbar/navbar.component";
import {HomeComponent} from "./home/home.component";
import { LoginComponent } from './login/login.component';
import { ProvidersComponent } from "./providers/providers.component";
import {StatBarChartsComponent} from "./stat-barcharts/stat-barcharts.component";
import { NetworkStatsComponent } from "./networkStats/networkStats.component";
import {OSStatsComponent} from "./osStats/osStats.component";
import {VendorStatsComponent} from "./vendorStats/vendorStats.component";
import { MapsComponent } from './maps/maps.component';


import {ChartsModule} from 'ng2-charts' ;

import {DataService} from "./_services/data.service";
import { AuthenticationService} from './_services/authentication.service';
import { AuthGuard } from './_guards/auth.guard';
import {NavBarService} from './_services/navBarService.service';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { NguiMapModule } from '@ngui/map';
import {ButtonsModule} from 'ngx-bootstrap';



@NgModule({
    imports:[
        BrowserModule,
        routing,
        HttpModule,
        FormsModule,
        NgbModule.forRoot(),
        ChartsModule,
        MyDateRangePickerModule,
        NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyDebjxXSei-aBXW-N50NVmO48Q_FMxrwTA&libraries=visualization'}),
        ButtonsModule.forRoot()
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        LoginComponent,
        ProvidersComponent,
        StatBarChartsComponent,
        NetworkStatsComponent,
        OSStatsComponent,
        VendorStatsComponent,
        MapsComponent
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
