import { Observable } from 'rxjs/Rx';
import {Injectable} from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Measurements } from '../_models/measurements';
import { DataService } from './data.service';

@Injectable()
export class DataResolve implements Resolve<Measurements>{
    constructor(
        private _dataservice : DataService
    ){}
    resolve(route : ActivatedRouteSnapshot): Observable<Measurements[]>{
            return this._dataservice.getAll();
    }
}