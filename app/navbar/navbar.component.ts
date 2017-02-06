import {Component, OnInit} from '@angular/core';
import {NavBarService} from "../_services/navBarService.service";

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})


export class NavbarComponent implements OnInit{
    public currentUser: string=JSON.parse(localStorage.getItem('currentUser'));
    public state:boolean;

    constructor(private _navBarService : NavBarService){
        this._navBarService.navState$.subscribe(state=>this.state = state);
    }
    ngOnInit(){
        this._navBarService.setNavState(false);
    }
}
