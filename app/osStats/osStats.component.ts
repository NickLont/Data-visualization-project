import { Component, OnInit } from '@angular/core';
import {DataService} from "../_services/data.service";
import {Router} from "@angular/router";

@Component({
    selector: 'osStats',
    templateUrl: './osStats.component.html',
    styleUrls: ['./osStats.component.css']
})

export class OSStatsComponent implements  OnInit {
    public dataReady : boolean = false;
    public osystems : any;
    public total : number = 0;

    constructor( private _dataservice : DataService,
                 private _router : Router
    ){}
    ngOnInit(){
        this._dataservice.getOperatingSystems()
            .subscribe(res => {
                this.osystems = res;
                for(let r of res){
                        this.doughnutChartLabels.push(r.key);
                        this.doughnutChartData.push(r.value);
                        this.total+=r.value;
                }
                this.dataReady = true;

            },err=>{
                if(err==='Unauthorized'){
                    console.log('aunauthorized and redirecting');
                    this._router.navigate(['/login']);
                }
            } );
    }

    public doughnutChartLabels:string[] = [];
    public doughnutChartData:number[] = [];
    public doughnutChartType:string = 'doughnut';
    public doughnutChartOptions:any = {
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