import { Component, OnInit } from '@angular/core';
import {DataService} from "../_services/data.service";
import {Router} from "@angular/router";

@Component({
    selector: 'networkStats',
    templateUrl: './networkStats.component.html'
})

export class NetworkStatsComponent implements  OnInit {
    public dataReady : boolean = false;

    constructor( private _dataservice : DataService,
                 private _router : Router
    ){}
    ngOnInit(){
        this._dataservice.getNetworkTypes()
            .subscribe(res => {
                for(let r of res){
                    if(!r.key.indexOf("_")){
                        this.pieChartLabels.push("Unknown");
                        this.pieChartData.push(r.value);
                    }
                    else{
                        this.pieChartLabels.push(r.key);
                        this.pieChartData.push(r.value);
                    }

                }
                this.dataReady = true;

            },err=>{
                if(err==='Unauthorized'){
                    console.log('aunauthorized and redirecting');
                    this._router.navigate(['/login']);
                }
            } );
    }

    public pieChartLabels:string[] = [];
    public pieChartData:number[] = [];
    public pieChartType:string = 'pie';
    public pieChartOptions:any = {
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

}