import { Component, OnInit } from '@angular/core';
import {} from '@angular/router';
import {Http} from '@angular/http';


import { AuthenticationService } from '../_services/authentication.service';
import {Router} from "@angular/router";
import {NavBarService} from '../_services/navBarService.service'

@Component({
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit   {
    model: any = [];
    loading = false;
    error = '';

    constructor(
        private _router : Router,
        private _authenticationService : AuthenticationService,
        private _navBarService : NavBarService,
        private _http : Http
    ){}
    ngOnInit(){
        //reset login status
        this._authenticationService.logout();
        this._navBarService.setUsername('');

    }

    login(){
        this.loading = true;
        this._authenticationService.login(this.model.username, this.model.password)
            .subscribe(result=>{
                if(result === true){
                    console.log("login succesful");
                    this._navBarService.setUsername(this.model.username);
                    this._router.navigate(['/home']);
                }
                else {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
                //TODO write catch function
            });
    }
}