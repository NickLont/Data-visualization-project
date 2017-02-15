import { Component, OnInit } from '@angular/core';
import {DataService} from "../_services/data.service";
import {Measurements} from "../_models/measurements";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'bar-chart',
    templateUrl: './bar-chart.component.html'
})

export class BarChartComponent implements  OnInit{

    public dataReady : boolean = false;

    constructor( private _dataservice : DataService,
    ){}
    ngOnInit(){
        this._dataservice.getOperators()
            .subscribe(res => {
                for(let r of res){
                    let clone = JSON.parse(JSON.stringify(this.barChartData));
                    clone.push({data: [r.value], label: r.operatorname});
                    this.barChartData = clone;
                }
                this.dataReady = true;
                console.log('data ready to parse');
            } );

    }

    public barChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels:string[] = ['Comparison'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;

    public barChartData:any[] = [];

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }
}