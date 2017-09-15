import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';
import {Measurements} from "../_models/measurements";
import {AuthenticationService} from './authentication.service';

@Injectable()
export class DataService {
    private baseUrl : string = 'http://test.hua.gr:8080/HuaTester/api/';
    // private baseUrl : string = 'http://localhost:8081/api/';
    public headers : Headers;

    constructor(
        private _http : Http,
        private _authenticationService : AuthenticationService){
        this.headers = new Headers();
        this.headers.set('token', this._authenticationService.token);
    }

    getMeasurementCount(){
        return this._http
            .get(this.baseUrl+'/measurement/count/', {headers : this.headers})
            .map((res:Response)=>res.json())
            .catch(this.handleError);

    }

    getOperators(networkType?: String){
        if(networkType){
            return this._http
                .get(this.baseUrl+'measurement/allproviders/'+networkType+'/', {headers : this.headers})
                .map((res:Response)=>res.json())
                .catch(this.handleError);
        }
        return this._http
            .get(this.baseUrl+'measurement/allproviders/', {headers : this.headers})
            .map((res:Response)=>res.json())
            .catch(this.handleError);
    }
    getStats(measurementType : String, networkType : String, startDate?: String, endDate?: String){
        if(networkType=='no'){
            if(startDate ==null && endDate == null){
                return this._http
                    .get(this.baseUrl+'measurement/'+measurementType+'/', {headers : this.headers})
                    .map((res:Response)=>res.json())
                    .catch(this.handleError);
            }
            else if(startDate !=null && endDate != null){
                return this._http
                    .get(this.baseUrl+'measurement/'+measurementType+'/'+startDate+'/'+endDate, {headers : this.headers})
                    .map((res:Response)=>res.json())
                    .catch(this.handleError);
            }
        }
        else if(networkType!='no'){
            if(startDate ==null && endDate == null){
                return this._http
                    .get(this.baseUrl+'measurement/'+measurementType+'/'+networkType, {headers : this.headers})
                    .map((res:Response)=>res.json())
                    .catch(this.handleError);
            }
            else if(startDate !=null && endDate != null){
                return this._http
                    .get(this.baseUrl+'measurement/'+measurementType+'/'+startDate+'/'+endDate+'/'+networkType, {headers : this.headers})
                    .map((res:Response)=>res.json())
                    .catch(this.handleError);
            }
        }
    }

    getNetworkTypes(){
        return this._http
            .get(this.baseUrl+'measurement/networkTypes/', {headers : this.headers})
            .map((res:Response)=>res.json())
            .catch(this.handleError);
    }

    getOperatingSystems(){
        return this._http
            .get(this.baseUrl+'measurement/operatingSystems/', {headers : this.headers})
            .map((res:Response)=>res.json())
            .catch(this.handleError);
    }

    getVendors(){
        return this._http
            .get(this.baseUrl+'measurement/vendors/', {headers : this.headers})
            .map((res:Response)=>res.json())
            .catch(this.handleError);
    }

    getDownlinkPoints(operator:string){
        return this._http
            .get("http://test.hua.gr:8080/geoserver/hua_meas/ows?service=WFS&version=1.1.0&request=GetFeature&typeName=hua_meas:SQLView_Param&viewparams=operator:"+operator+"&outputFormat=application%2Fjson")
            .map((res:Response)=>res.json())
            .catch(this.handleError);
    }

    getUplinkPoints(operator:string){
        return this._http
            .get("http://test.hua.gr:8080/geoserver/hua_meas/ows?service=WFS&version=1.1.0&request=GetFeature&typeName=hua_meas:SQLView_Param_ul&viewparams=operator:"+operator+"&outputFormat=application%2Fjson")
            .map((res:Response)=>res.json())
            .catch(this.handleError);
    }


    private handleError(error: Response | any) {
        let errMsg: string;
        if(error.status===401){
            console.log('unauthorized 401 error');
            return Observable.throw('Unauthorized');
        }
        else if (error instanceof Response) {
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

//Function chain to map the Measurements from the DB to our Measurement model
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
