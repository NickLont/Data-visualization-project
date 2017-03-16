import { Component, OnInit } from '@angular/core';
import {DataService} from "../_services/data.service";

@Component({
    selector: 'stat-barcharts',
    templateUrl: './stat-barcharts.component.html'
})
export class StatBarChartsComponent implements  OnInit{

    public dataReady : boolean = false;

    constructor( private _dataservice : DataService,
    ){}
    ngOnInit(){
        this._dataservice.getLevelStats('no')
            .subscribe(res => {
                for(let r of res){
                    this.barChartLabels.push(r.operatorname)
                    this.barChartData[0].data.push(r.avg);
                    this.barChartData[1].data.push(r.min);
                    this.barChartData[2].data.push(r.max);
                }
                this.dataReady = true;
            } );

    }
    public barChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                    }
            }]
        }
    };
    public barChartLabels:string[] = [];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;

    public barChartData:any[] = [
        {data: [], label: 'Average'},
        {data: [], label: 'Minimum'},
        {data: [], label: 'Maximum'},
    ];

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

}