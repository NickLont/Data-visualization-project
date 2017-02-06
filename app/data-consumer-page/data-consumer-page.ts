import { Component, OnInit } from '@angular/core';
import {DataService} from "../_services/data.service";

@Component({
  templateUrl: 'data-consumer-page.html'
})
export class DataConsumerPageComponent implements OnInit   {
  measurements='';

  constructor( private _dataservice : DataService){}
  ngOnInit() {
    this._dataservice.getOperators()
      .subscribe(
          data => {
            this.measurements= data;
            console.log('ta data einai: '+data);
          },
          error=> console.log(JSON.stringify(error))
      );
  }
}
