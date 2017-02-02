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
        console.log("req send with username: "+username+" password: "+ password);
        let headers = new Headers();
        headers.append( 'Content-Type','application/x-www-form-urlencoded' );

        return this.http
            .post(this.loginUrl, JSON.stringify({ username: username, password: password }), {headers: headers})
            .map((response:Response)=>{
                //succesful login if there is a token in the response
                let token = response.json() && response.headers.get('token');
                if (token){
                    //set token
                    this.token = response.headers.get('token');
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