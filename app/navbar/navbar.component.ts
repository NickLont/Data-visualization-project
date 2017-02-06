import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../_services/authentication.service";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit{
    public currentUser: string=JSON.parse(localStorage.getItem('currentUser'));

    constructor(_authenticationService : AuthenticationService){}
    ngOnInit(){
    }

}
