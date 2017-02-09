import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';
import {Measurements} from "../_models/measurements";
import { AuthenticationService} from './authentication.service';

@Injectable()
export class DataService {
    private baseUrl : string = 'http://test.hua.gr:8080/HuaTester/api/measurement/';
    public headers : Headers;

    constructor(
        private _http : Http,
        private _authenticationService : AuthenticationService){
    console.log('Data Service started');
    this.headers = new Headers();
    this.headers.set('token', this._authenticationService.token);
    console.log('ta header keys einai: '+this.headers.keys());
    console.log('ta header value einai: '+this.headers.values());
    }

  getAll(): Observable<Measurements[]>{
    return this._http
      .get(this.baseUrl+'all', {headers : this.headers})
      .map((res: Response)=>mapMeasurments(res))
      .catch(this.handleError);
  }

  getOperators(){
    return this._http
        .get(this.baseUrl+'all', {headers : this.headers})
        .map((res:Response)=>res.json())
        .catch(this.handleError);
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


  function mapMeasurments(response : Response): Measurements[]{
    return response.json().map(toMeasurment)
  }

  function toMeasurment(r : any): Measurements{
    let measurments = <Measurements>({
      id : r.id,
      cellid : r.cellid,
      networkType : r.networkType,
      node : r.node
    });
    return measurments;
  }
