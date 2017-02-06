import { Subject } from 'rxjs';
import {Injectable} from "@angular/core";

@Injectable()
export class NavBarService {

    //Observable boolean source
    private navStateSource = new Subject<boolean>();

    // Observable string stream
    navState$ = this.navStateSource.asObservable();

    setNavState(state : boolean){
        this.navStateSource.next(state);
    }


}