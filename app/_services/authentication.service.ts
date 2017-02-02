import { Injectable } from '@angular/core';
import  { Http, Headers, Response} from '@angular/http';
import { Observable} from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService{
    public token: string;
    private loginUrl: string = 'http://test.hua.gr:8080/HuaTester/login/';

    constructor (private http:Http){
        //set token if stored in local storage
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string): Observable<boolean>{
        return this.http
            .post(this.loginUrl, JSON.stringify({ username: username, password: password }))
            .map((response:Response)=>{
                //succesful login if there is a token in the response
                let token = response.json() && response.json().token;
                if (token){
                    //set token
                    this.token = token;
                    //store username and token in local storage
                    localStorage.setItem('currentUser', JSON.stringify({username: username, token: token}));
                    //succesful login
                    console.log('login succesful');
                    return true;
                }
                else {
                    //failed login
                    return false;
                }
            });
    }
    logout():void{
        //clear token and remove currentUser from localStorage
        this.token = null;
        localStorage.removeItem('currentUser');
    }

}