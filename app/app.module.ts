import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';


import { AppComponent }  from './app.component';
import {routing} from "./app.routing";
import {NavbarComponent} from "./navbar/navbar.component";
import {HomeComponent} from "./home/home.component";
import {DataConsumerPageComponent} from "./data-consumer-page/data-consumer-page";

import {DataService} from "./_services/data.service";


@NgModule({
  imports:      [ BrowserModule, routing, HttpModule ],
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DataConsumerPageComponent
  ],
  bootstrap:    [ AppComponent ],
  providers: [ DataService ]
})
export class AppModule { }
