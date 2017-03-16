import { Component, OnInit } from '@angular/core';
import {DataService} from "../_services/data.service";

@Component({
    selector: 'bar-chart',
    templateUrl: './bar-chart.component.html'
})

export class BarChartComponent implements  OnInit{

    public dataReady : boolean = false;
    model: any = [];
    selectedValue : any = null;
    measurementTypes=['Level', 'Uplink', 'Downlink'];


    constructor( private _dataservice : DataService,
    ){}
    ngOnInit(){
        this._dataservice.getOperators()
            .subscribe(res => {
                for(let r of res){
                    // let clone = JSON.parse(JSON.stringify(this.barChartData));
                    // let clone = JSON.parse(JSON.stringify(this.barChartData));
                    // clone.push({data: [r.value], label: r.operatorname});
                    // this.barChartData = clone;
                    this.pieChartLabels.push(r.operatorname);
                    this.pieChartData.push(r.value);
                }
                this.dataReady = true;
                console.log('data ready to parse');
            } );

    }


    public pieChartLabels:string[] = [];
    public pieChartData:number[] = [];
    public pieChartType:string = 'pie';
    public pieChartColors: any[]=[{backgroundColor:['#97BBCD','#FDB45C','#46BFBD','#F7464A','#4D5360']}]
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

    onSubmit(){
        console.log('to type mou einai: '+this.model.type);

    }
}