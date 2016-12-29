import { Component, OnInit } from '@angular/core';
import {DataService} from "../_services/data.service";
import {Measurements} from "../_models/measurements";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'bar-chart',
    templateUrl: './bar-chart.component.html'
})

export class BarChart implements  OnInit{
    measurements : Measurements[]=[];
    private windMeasurments: number= 0;
    private cosmoteMeasurments: number= 0;

    public dataReady : boolean = false;


    constructor( private _dataservice : DataService,
    ){}
    ngOnInit(){
        this._dataservice.getAll()
            .subscribe(data => {
                this.measurements= data;
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
                console.log(this.measurements)
            } );
        // this.measurements = this._route.snapshot.data['measurements'];

        // this.barChartData[0].data[0] = this.measurements.filter(m => m.operatorname === 'GR_COSMOTE').length  ;
        //
        // this.barChartData[1].data[0] = this.measurements.filter(m => m.operatorname === 'GR_WIND').length;

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