import {Component} from '@angular/core';
import {NavBarService} from "../_services/navBarService.service";

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})


export class NavbarComponent{
    public currentUser: string=JSON.parse(localStorage.getItem('currentUser'));
    public state:boolean = true;

    constructor(private _navBarService : NavBarService){
        this._navBarService.navState$.subscribe(state=>this.state = state);
    }
}
