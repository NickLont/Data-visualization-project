import { Component, OnInit } from '@angular/core';
import {DataService} from "../_services/data.service";
import {Router} from "@angular/router";
import {IMyDateRange, IMyOptions} from 'mydatepicker';


@Component({
    selector: 'stat-barcharts',
    templateUrl: './stat-barcharts.component.html'
})
export class StatBarChartsComponent implements  OnInit{

    public dataReady : boolean = false;
    model: any = [];
    measurementTypes=[
        {name:'Level', value:'levelStats'},
        {name:'Uplink', value:'uplinkStats'},
        {name:'Downlink', value:'downlinkStats'}
    ];
    gens=[
        {name:'All', value:'no'},
        {name:'2G', value:'2g'},
        {name:'3G', value:'3g'}
    ];
    private myDatePickerOptions: IMyOptions = {
        //  options
        dateFormat: 'yyyy-mm-dd',
        disableUntil: {year: 2013, month: 7, day: 20},

    };
    private myDatePickerOptions2: IMyOptions = {
        //  options
        dateFormat: 'yyyy-mm-dd',

    };


    constructor( private _dataservice : DataService,
                 private _router : Router
    ){}
    ngOnInit(){
        this._dataservice.getStats('levelStats','no')
            .subscribe(res => {
                this.model.type='levelStats';
                this.model.gen='no';
                // this.model.startDate={ date: { year: 2018, month: 10, day: 9 } };
                for(let r of res){
                    this.barChartLabels.push(r.operatorname)
                    this.barChartData[0].data.push(r.avg.toF);
                    this.barChartData[1].data.push(r.min);
                    this.barChartData[2].data.push(r.max);

                }
                this.dataReady = true;
            }, err=>{
                if(err==='Unauthorized'){
                    this._router.navigate(['/login']);
                }
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
    onSubmit(){
        console.log('to type mou einai: '+this.model.type);
        this._dataservice.getStats(this.model.type, this.model.gen)
        .subscribe(res => {
            this.barChartLabels=[];
            for(let chartData of this.barChartData){
                chartData.data=[];
            }
            for(let r of res){
                this.barChartLabels.push(r.operatorname)
                this.barChartData[0].data.push(r.avg);
                this.barChartData[1].data.push(r.min);
                this.barChartData[2].data.push(r.max);
            }
            console.log(this.model.startDate.formatted);
            console.log(this.model.endDate.formatted);
            this.dataReady = true;
        } );
    }

}