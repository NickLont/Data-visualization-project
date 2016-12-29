import { Component, OnInit } from '@angular/core';
import {DataService} from "../_services/data.service";
import {Measurements} from "../_models/measurements";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'bar-chart',
    templateUrl: './bar-chart.component.html'
})

export class BarChart implements  OnInit{
    // measurements : Measurements[]=[];
    private windMeasurments: number= 0;
    private cosmoteMeasurments: number= 0;

    public dataReady : boolean = false;


    constructor( private _dataservice : DataService,
    ){}
    ngOnInit(){
        this._dataservice.getAll()
            .subscribe(data => {
                // this.measurements= data;
                for(let d of data){
                    if(d.operatorname==='GR_COSMOTE'){
                        this.cosmoteMeasurments++;
                    }
                    else if(d.operatorname==='GR_WIND'){
                        this.windMeasurments++;
                    }
                    let cosmoteData=[this.cosmoteMeasurments];
                    let windData=[this.windMeasurments];
                    let clone = JSON.parse(JSON.stringify(this.barChartData));
                    clone[0].data = cosmoteData;
                    clone[1].data = windData;
                    this.barChartData = clone;

                }
            } );

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

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }
}