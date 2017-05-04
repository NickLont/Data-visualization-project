import { Component, OnInit } from '@angular/core';
import {DataService} from "../_services/data.service";
import {Router} from "@angular/router";

@Component({
    selector: 'networkStats',
    templateUrl: './networkStats.component.html'
})

export class NetworkStatsComponent implements  OnInit {
    public dataReady : boolean = false;

    constructor( private _dataservice : DataService,
                 private _router : Router
    ){}
    ngOnInit(){
        this._dataservice.getNetworkTypes()
            .subscribe(res => {
                for(let r of res){
                    if(!r.key.indexOf("_")){
                        this.pieChartLabels.push("Unknown");
                        this.pieChartData.push(r.value);
                    }
                    else{
                        this.pieChartLabels.push(r.key);
                        this.pieChartData.push(r.value);
                    }

                }
                this.dataReady = true;

            },err=>{
                if(err==='Unauthorized'){
                    console.log('aunauthorized and redirecting');
                    this._router.navigate(['/login']);
                }
            } );
    }

    public pieChartLabels:string[] = [];
    public pieChartData:number[] = [];
    public pieChartType:string = 'pie';

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

}