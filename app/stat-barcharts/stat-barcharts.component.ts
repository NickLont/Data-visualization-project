import { Component, OnInit } from '@angular/core';
import {DataService} from "../_services/data.service";
import {Router} from "@angular/router";
import { IMyOptions} from 'mydaterangepicker';


@Component({
    selector: 'stat-barcharts',
    styleUrls: ['./stat-barcharts.component.css'],
    templateUrl: './stat-barcharts.component.html'
})
export class StatBarChartsComponent implements  OnInit{

    public dataReady : boolean = false;
    public statistics : any;
    public unit : string ;

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

    // Date Range Options

    private myDateRangePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'dd/mmm/yyyy',
        inline: false,
        disableUntil: {year:2013, month:7, day:19},
        disableSince: {year:2014, month:7, day:14},
        sunHighlight: false,
    };



    constructor( private _dataservice : DataService,
                 private _router : Router
    ){}
    ngOnInit(){
        this._dataservice.getStats('levelStats','no')
            .subscribe(res => {
                // Initializing Form and Chart Values
                this.statistics = res;
                this.model.type='levelStats';
                this.barChartOptions.title.text='Level Statistics';
                this.barChartOptions.scales.yAxes[0].scaleLabel.labelString='dB';
                this.unit='dB';
                this.model.gen='no';
                this.model.dates = {beginDate: {year: 2013, month: 7, day: 20},
                    endDate: {year: 2014, month: 7, day: 13}};

                for(let r of res){
                    this.barChartLabels.push(r.operatorname);
                    this.barChartData[0].data.push(r.avg.toFixed(2));
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

    //ChartJS Options

    public barChartOptions:any = {
        title: {
            display: true,
            fontSize: 24,
            text: ''
        },
        scaleShowVerticalLines: false,
        responsive: true,
        legend: {
            display: true,
            position: 'bottom'
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                },
                scaleLabel: {
                    display: true,
                    labelString: ''
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
        //Check to see for Date Range entries
        if(this.model.dates.formatted){
            let beginDate = new Date(this.model.dates.beginEpoc*1000);
            let endDate = new Date(this.model.dates.endEpoc*1000);
            let formattedBeginDate : String= beginDate.getFullYear()+"-"+(beginDate.getMonth()+1)+"-"+beginDate.getDate();
            let formattedEndDate : String= endDate.getFullYear()+"-"+(endDate.getMonth()+1)+"-"+endDate.getDate();

            this._dataservice.getStats(this.model.type, this.model.gen, formattedBeginDate,formattedEndDate)
                .subscribe(res => {
                    this.statistics = res;
                    // this.barChartOptions.title.text=this.model.type;

                    //Setting graph legend and title
                    if(this.model.type =='levelStats'){
                        this.barChartOptions.title.text='Level Statistics';
                        this.barChartOptions.scales.yAxes[0].scaleLabel.labelString='dB';
                        this.unit='dB';
                    }
                    else if(this.model.type =='uplinkStats'){
                        this.barChartOptions.title.text='Uplink Statistics';
                        this.barChartOptions.scales.yAxes[0].scaleLabel.labelString='kb/s';
                        this.unit='kb/s';
                    }
                    else if(this.model.type =='downlinkStats'){
                        this.barChartOptions.title.text='Downlink Statistics';
                        this.barChartOptions.scales.yAxes[0].scaleLabel.labelString='kb/s';
                        this.unit='kb/s';
                    }
                    this.barChartLabels=[];
                    for(let chartData of this.barChartData){
                        chartData.data=[];
                    }
                    for(let r of res){
                        this.barChartLabels.push(r.operatorname);
                        this.barChartData[0].data.push(r.avg.toFixed(2));
                        this.barChartData[1].data.push(r.min);
                        this.barChartData[2].data.push(r.max);
                    }
                    this.dataReady = true;
                } );
        }
        // Without Date Range
        else{
            this._dataservice.getStats(this.model.type, this.model.gen)
                .subscribe(res => {
                    this.statistics = res;

                    //Setting graph legend and title
                    if(this.model.type =='levelStats'){
                        this.barChartOptions.title.text='Level Statistics';
                        this.barChartOptions.scales.yAxes[0].scaleLabel.labelString='dB';
                        this.unit='dB';
                    }
                    else if(this.model.type =='uplinkStats'){
                        this.barChartOptions.title.text='Uplink Statistics';
                        this.barChartOptions.scales.yAxes[0].scaleLabel.labelString='kb/s';
                        this.unit='kb/s';
                    }
                    else if(this.model.type =='downlinkStats'){
                        this.barChartOptions.title.text='Downlink Statistics';
                        this.barChartOptions.scales.yAxes[0].scaleLabel.labelString='kb/s';
                        this.unit='kb/s';
                    }

                    this.barChartLabels=[];
                    for(let chartData of this.barChartData){
                        chartData.data=[];
                    }
                    for(let r of res){
                        this.barChartLabels.push(r.operatorname);
                        this.barChartData[0].data.push(r.avg.toFixed(2));
                        this.barChartData[1].data.push(r.min);
                        this.barChartData[2].data.push(r.max);
                    }
                    this.dataReady = true;
                } );
        }
    }

}