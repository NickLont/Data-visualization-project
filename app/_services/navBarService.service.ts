import { Subject } from 'rxjs';
import {Injectable} from "@angular/core";

@Injectable()
export class NavBarService {

    //Observable boolean source
    private navStateSource = new Subject<boolean>();
    private navUsernameSource = new Subject<string>();

    // Observable string stream
    navState$ = this.navStateSource.asObservable();
    navUsername$ = this.navUsernameSource.asObservable();

    setNavState(state : boolean){
        this.navStateSource.next(state);
    }
    setUsername(name : string){
        this.navUsernameSource.next(name);
        // console.log('username set to: '+name);
    }
    //TODO ERROR HANDLING!

}