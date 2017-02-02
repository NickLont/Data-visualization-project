import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule }    from '@angular/forms';


import { AppComponent }  from './app.component';
import {routing} from "./app.routing";
import {NavbarComponent} from "./navbar/navbar.component";
import {HomeComponent} from "./home/home.component";
import {DataConsumerPageComponent} from "./data-consumer-page/data-consumer-page";
import { LoginComponent } from './login/login.component';

import {DataService} from "./_services/data.service";
import { AuthenticationService} from './_services/authentication.service';
import { AuthGuard } from './_guards/auth.guard';


@NgModule({
    imports:      [ BrowserModule, routing, HttpModule, FormsModule ],
    declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DataConsumerPageComponent,
    LoginComponent
    ],
    providers: [
      DataService,
      AuthenticationService,
      AuthGuard
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
