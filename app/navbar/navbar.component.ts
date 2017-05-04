import {Component, OnInit} from '@angular/core';
import {NavBarService} from "../_services/navBarService.service";

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})


export class NavbarComponent implements OnInit{
    public currentUser: string;

    constructor(private _navBarService : NavBarService){
        this._navBarService.navUsername$.subscribe(currentUser=> this.currentUser = currentUser);

    }
    // Set ng on change too
    ngOnInit(){
        this._navBarService.setUsername(JSON.parse(localStorage.getItem('currentUser')).username);
    }
}
