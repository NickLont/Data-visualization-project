import { Component, OnInit } from '@angular/core';
import {} from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';
import {Router} from "@angular/router";

@Component({
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit   {
    model: any = [];
    loading = false;
    error = '';

    constructor(
        private _router : Router,
        private _authenticationService : AuthenticationService){}
    ngOnInit(){
        //reset login status
        this._authenticationService.logout();
    }

    login(){
        this.loading = true;
        this._authenticationService.login(this.model.username, this.model.password)
            .subscribe(result=>{
                if(result === true){
                    this._router.navigate(['/']);
                }
                else {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }
}