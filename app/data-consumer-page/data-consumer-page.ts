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
    this._dataservice.getPoints("wind")
      .subscribe(
          data => {
            this.measurements= data;
            // console.log('ta data einai: '+data);
            for(let d of data.features){
                // console.log("ta data mou einai: "+d.geometry.coordinates);
                let splitted = d.geometry.coordinates.toString().split(",",2);
                // Splitting geometry in lat and lon
                console.log("ta 2 split einai: "+splitted[0]+" kai "+splitted[1]);
                //Splitting Dl_bitrate to 10 weights
                let weight = Math.floor(d.properties.dl_bitrate/1664)+1;
                console.log("unmodified weight: " +d.properties.dl_bitrate+" modified weight: "+weight)

            }
          },
          error=> {
              console.log(JSON.stringify(error));
              if(error==='Unauthorized'){
                  console.log('Unauthorized and redirecting');
                  this._router.navigate(['/login']);
              }
          }
      );
  }
}
