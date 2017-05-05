import { Component, OnInit } from '@angular/core';
import {DataService} from "../_services/data.service";
import {Router} from "@angular/router";

@Component({
    selector: 'osStats',
    templateUrl: './osStats.component.html'
})

export class OSStatsComponent implements  OnInit {
    public dataReady : boolean = false;

    constructor( private _dataservice : DataService,
                 private _router : Router
    ){}
    ngOnInit(){
        this._dataservice.getOperatingSystems()
            .subscribe(res => {
                for(let r of res){
                        this.doughnutChartLabels.push(r.key);
                        this.doughnutChartData.push(r.value);
                }
                this.dataReady = true;

            },err=>{
                if(err==='Unauthorized'){
                    console.log('aunauthorized and redirecting');
                    this._router.navigate(['/login']);
                }
            } );
    }

    public doughnutChartLabels:string[] = [];
    public doughnutChartData:number[] = [];
    public doughnutChartType:string = 'doughnut';

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

}