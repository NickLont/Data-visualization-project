import { Injectable } from '@angular/core';
import  {Http, Headers, Response, URLSearchParams} from '@angular/http';
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

    login(username: string, password: string) : Observable<boolean>{
        let headers = new Headers();
        headers.append( 'Content-Type','application/x-www-form-urlencoded' );
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('username', username);
        urlSearchParams.append('password', password);
        let body = urlSearchParams.toString();
        console.log('to body einai: '+ body);


         return this.http
            .post(this.loginUrl, body, {headers: headers})
            .map((response:Response)=>{
                //get token from header
                let token = response.headers.get('Token');
                console.log('ta headers einai: '+response.headers.values());
                console.log('to token einai:'+ token);
                if (token ){
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
                    console.log('login failed');
                    return false;
                }
            })
             // Catching error 401 of wrong credentials
             .catch(err=>{
                if (err.status ===401){
                    return Observable.of(false);
                }
                else{this.handleError}
             });
    }
    logout():void{
        //clear token and remove currentUser from localStorage
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}