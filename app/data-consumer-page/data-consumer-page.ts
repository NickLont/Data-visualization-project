import { Component, OnInit } from '@angular/core';
import {DataService} from "../_services/data.service";

@Component({
  templateUrl: 'data-consumer-page.html'
})
export class DataConsumerPageComponent implements OnInit   {
  measurements='';

  constructor( private _dataservice : DataService){}
  ngOnInit() {
    this._dataservice.getLevelStats('no','2013-10-20','2013-10-25')
      .subscribe(
          data => {
            this.measurements= data;
            console.log('ta data einai: '+data);
          },
          error=> console.log(JSON.stringify(error))
      );
  }
}
