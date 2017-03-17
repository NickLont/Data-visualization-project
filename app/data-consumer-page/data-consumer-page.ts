import { Component, OnInit } from '@angular/core';
import {DataService} from "../_services/data.service";
import {Router} from "@angular/router";

@Component({
  templateUrl: 'data-consumer-page.html'
})
export class DataConsumerPageComponent implements OnInit   {
  measurements='';

  constructor( private _dataservice : DataService,
               private _router : Router){}
  ngOnInit() {
    this._dataservice.getStats('levelStats','no','2013-10-20','2013-10-25')
      .subscribe(
          data => {
            this.measurements= data;
            console.log('ta data einai: '+data);
          },
          error=> {
              console.log(JSON.stringify(error));
              if(error==='Unauthorized'){
                  console.log('aunauthorized and redirecting');
                  this._router.navigate(['/login']);
              }
          }
      );
  }
}
