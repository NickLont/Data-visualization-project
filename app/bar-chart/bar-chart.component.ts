import { Component, OnInit } from '@angular/core';
import {DataService} from "../_services/data.service";
import {Measurements} from "../_models/measurements";
import {count} from "rxjs/operator/count";

@Component({
    selector: 'bar-chart',
    templateUrl: './bar-chart.component.html'
})

export class BarChart implements  OnInit{
    measurements: Measurements[] = [];
    // cosmoteMeasures : number = count(this.measurements
    //     .filter(operator=> operator.operatorname==='GR_COSMOTE'));
    // windMeasures : number = 0;

    constructor( private _dataservice : DataService){}
    ngOnInit(){
        this._dataservice.getAll()
            .subscribe(data => {
                this.measurements= data;
            } );
    }

    public barChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels:string[] = ['Comparison'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;

    public barChartData:any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Cosmote'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Vodafone'}
    ];



    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }
}