import { Component, OnInit } from '@angular/core';
import {DataService} from "../_services/data.service";
import {Measurements} from "../_models/measurements";

@Component({
  templateUrl: 'data-consumer-page.html'
})
export class DataConsumerPageComponent implements OnInit   {
  measurements: Measurements[]=[];

  constructor( private _dataservice : DataService){}
  ngOnInit() {
    this._dataservice.getAll()
      .subscribe(data => {
        this.measurements= data;
      } );
  }
}
