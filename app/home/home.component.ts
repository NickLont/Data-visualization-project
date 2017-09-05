import { Component, OnInit} from '@angular/core';
import {DataService} from "../_services/data.service";
import {Router} from "@angular/router";

@Component({
  templateUrl: 'home.component.html'
})
export class HomeComponent implements  OnInit {
  public count : number=0;
  public dataReady : boolean = false;


  constructor( private _dataservice : DataService,
               private _router : Router

  ){}


  ngOnInit(){
      // location.reload();
      this._dataservice.getMeasurementCount()
        .subscribe(res => {
          this.count = res;
          this.dataReady = true;
        },err=>{
          if(err==='Unauthorized'){
            console.log('unauthorized and redirecting');
            this._router.navigate(['/login']);
          }
        } );
  }
}
