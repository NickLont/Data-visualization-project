import { Component, OnInit } from '@angular/core';
import {DataService} from "../_services/data.service";
import {ChartsModule} from "ng2-charts";
import {Measurements} from "../_models/measurements";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'bar-chart',
    templateUrl: './bar-chart.component.html'
})

export class BarChart implements  OnInit{
    measurements : Measurements[]=[];
    // windMeasurments: Measurements[]=[];
    // cosmoteMeasurments: Measurements[]=[];

    public dataReady : boolean = false;


    constructor( private _dataservice : DataService,
        private _route : ActivatedRoute
    ){}
    ngOnInit(){
        // this._dataservice.getAll()
        //     .subscribe(data => {
        //         // this.measurements= data;
        //         for(let d of data){
        //             if(d.operatorname === 'GR_COSMOTE'){
        //                 this.cosmoteMeasurments.push(d);
        //                 this.cosmoteNum++;
        //             }
        //             else if (d.operatorname === 'GR_WIND'){
        //                 this.windMeasurments.push(d);
        //                 this.windNum++;
        //             }
        //         };
        //         this.dataReady = true;
            // } );
        this.measurements = this._route.snapshot.data['measurements'];

        this.barChartData[0].data[0] = this.measurements.filter(m => m.operatorname === 'GR_COSMOTE').length  ;

        this.barChartData[1].data[0] = this.measurements.filter(m => m.operatorname === 'GR_WIND').length;

        this.dataReady = true;
    }

    public barChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels:string[] = ['Comparison'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;

    public barChartData:any[] = [
        {data: [0], label: 'Cosmote'},
        {data: [0], label: 'Wind'}
    ];

    // public renderLiveData(){
    //     this.barChartData[0].data = this.cosmoteNum;
    //     this.barChartData[1].data = this.windNum;
    //
    // }

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }
}