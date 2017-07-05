import { Component, OnInit } from '@angular/core';
import {DataService} from "../_services/data.service";
import {Router} from "@angular/router";

@Component({
    selector: 'bar-chart',
    templateUrl: './providers.component.html',
    styleUrls: ['./providers.component.css']
})

export class ProvidersComponent implements  OnInit{

    public radioModel: string = '';
    public dataReady : boolean = false;
    public operators : any;
    public total : number = 0;
    Math:any;


    constructor( private _dataservice : DataService,
                 private _router : Router,
    ){}
    ngOnInit(){
        this.Math=Math;
        this._dataservice.getOperators()
            .subscribe(res => {
                this.operators = res;
                for(let r of res){
                    // let clone = JSON.parse(JSON.stringify(this.barChartData));
                    // let clone = JSON.parse(JSON.stringify(this.barChartData));
                    // clone.push({data: [r.value], label: r.operatorname});
                    // this.barChartData = clone;
                    this.pieChartLabels.push(r.operatorname);
                    this.pieChartData.push(r.value);
                    this.total+=r.value;
                }
                console.log("to total einai: "+ this.total);
                this.dataReady = true;
                console.log('data ready to parse');
            }, err=>{
                if(err==='Unauthorized'){
                    console.log('aunauthorized and redirecting');
                    this._router.navigate(['/login']);
                }
            } )

    }


    public pieChartLabels:string[] = [];
    public pieChartData:number[] = [];
    public pieChartType:string = 'pie';
    public pieChartColors: any[]=[{backgroundColor:['#97BBCD','#FDB45C','#46BFBD','#F7464A','#4D5360']}];
    public pieChartOptions:any = {
        // title: {
        //     display: true,
        //     fontSize: 24,
        //     text: 'Internet Providers',
        //     fontColor:"#7B2F3D"
        // },
        legend: {
            display: true,
            position: 'bottom'
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItem:any, data:any) {
                    let value = data.datasets[0].data[tooltipItem.index];
                    let label = data.labels[tooltipItem.index];
                    let allData = data.datasets[tooltipItem.datasetIndex].data;
                    let total = 0;
                    for (let i in allData) {
                        total += allData[i];
                    }

                    let percentage = Math.round(value / total * 100);
                    return label + ' ' + percentage + '%';
                }
            }
        }
    };

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

    public radioChange(val:any):void{
        console.log(val)
        this._dataservice.getOperators(val)
            .subscribe(res => {
                this.operators = res;
                this.pieChartLabels=[];
                this.pieChartData=[];
                this.total=0;

                for(let r of res){
                    this.pieChartLabels.push(r.operatorname);
                    this.pieChartData.push(r.value);
                    this.total+=r.value;
                }
                // console.log("to total einai: "+ this.total);
                this.dataReady = true;
                // console.log('data ready to parse');
            }, err=>{
                if(err==='Unauthorized'){
                    console.log('aunauthorized and redirecting');
                    this._router.navigate(['/login']);
                }
            } )
    }


}