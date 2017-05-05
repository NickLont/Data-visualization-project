import { Component, OnInit } from '@angular/core';
import {DataService} from "../_services/data.service";
import {Router} from "@angular/router";

@Component({
    selector: 'vendorStats',
    templateUrl: './vendorStats.component.html'
})

export class VendorStatsComponent implements  OnInit {
    public dataReady : boolean = false;

    constructor( private _dataservice : DataService,
                 private _router : Router
    ){}
    ngOnInit(){
        this._dataservice.getVendors()
            .subscribe(res => {
                for(let r of res){
                    this.barChartLabels.push(r.key);
                    this.barChartData[0].data.push(r.value);
                }
                this.dataReady = true;

            },err=>{
                if(err==='Unauthorized'){
                    console.log('aunauthorized and redirecting');
                    this._router.navigate(['/login']);
                }
            } );
    }

    public barChartLabels:string[] = [];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;

    public barChartData:any[] = [
        {data: [], label: ''},
    ];
    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

}