import {Component, OnInit, ViewChild} from '@angular/core';
import {HeatmapLayer} from '@ngui/map';
import {DataService} from "../_services/data.service";
import {Router} from "@angular/router";


declare var google: any;


@Component({
    templateUrl: 'maps.component.html',
    styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit{

    model: any = [];
    //Select elements values
    measurementTypes=[
        {name:'Uplink', value:'uplink'},
        {name:'Downlink', value:'downlink'}
    ];
    providers=[
        {name:'Vodafone', value:'vodafone'},
        {name:'Cosmote', value:'cosmote'},
        {name:'Wind', value:'wind'}
    ];

    legend = document.createElement('div');
    leftToRightGradient='left';
    gradientMax=0;

    @ViewChild(HeatmapLayer) heatmaplayer : HeatmapLayer;
    heatmap: google.maps.visualization.HeatmapLayer;
    map: google.maps.Map;
    points : any= [
    ];


    constructor( private _dataservice : DataService,
                 private _router : Router
    ){}


    ngOnInit() {
        //Initialize form values
        this.model.type='uplink';
        this.model.provider='vodafone';

        this._dataservice.getUplinkPoints("vodafone").subscribe(res=>{
            for(let r of res.features){
                // Get lat and lon from Point
                let splitted = r.geometry.coordinates.toString().split(",",2);
                let weight = Math.floor(r.properties.dl_bitrate/441)+1;
                //Get the weight for the measurement
                this.points.push({location: new google.maps.LatLng(splitted[1], splitted[0]), weight: weight})
                this.gradientMax=4407;
            }
            this.heatmap.setMap(this.map);
        },err=>{
            if(err==='Unauthorized'){
                console.log('unauthorized and redirecting');
                this._router.navigate(['/login']);
            }
        } );

        this.heatmaplayer['initialized$'].subscribe((heatmap:any) => {
            heatmap.set('radius',5);
            this.heatmap = heatmap;
            this.map = this.heatmap.getMap();


            this.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(this.legend)

        });

    }

    toggleHeatmap() {
        this.heatmap.setMap(this.heatmap.getMap() ? null : this.map);
    }
    changeGradient() {

        let gradient = [
            'rgba(255, 0, 0, 0)',
            'rgba(255,0,0,1)',
            'rgba(251, 109,0,1)',
            'rgba(254, 189, 0,1)',
            'rgba(209, 252, 1,1)',
            'rgba(11, 255, 0,1)'
        ];
        this.heatmap.set('gradient', this.heatmap.get('gradient') ? null : gradient);
        this.leftToRightGradient = this.heatmap.get('gradient') ? 'right' : 'left';
    }
    changeRadius() {
        this.heatmap.set('radius', this.heatmap.get('radius') ? null : 5);
    }

    changeOpacity() {
        this.heatmap.set('opacity', this.heatmap.get('opacity') ? null : 0.2);
    }
    onZoomChange(event : any){
        // console.log(event);
    }

    onMapClick(event : any) {
        // console.log(event);
    }

    onSubmit(){
        this.points=[];
        if(this.model.type =='uplink'){
            this._dataservice.getUplinkPoints(this.model.provider).subscribe(res=>{
                    for(let r of res.features){
                        // Get lat and lon from Point
                        let splitted = r.geometry.coordinates.toString().split(",",2);
                        let weight = Math.floor(r.properties.dl_bitrate/441)+1;
                        //Get the weight for the measurement
                        this.points.push({location: new google.maps.LatLng(splitted[1], splitted[0]), weight: weight})
                    }
                    this.heatmap.setMap(this.map);

                },err=>{
                    if(err==='Unauthorized'){
                        console.log('unauthorized and redirecting');
                        this._router.navigate(['/login']);
                    }
                } );
        }
        else if(this.model.type =='downlink'){
            this._dataservice.getDownlinkPoints(this.model.provider).subscribe(res=>{
                for(let r of res.features){
                    // Get lat and lon from Point
                    let splitted = r.geometry.coordinates.toString().split(",",2);
                    let weight = Math.floor(r.properties.dl_bitrate/1664)+1;
                    //Get the weight for the measurement
                    this.points.push({location: new google.maps.LatLng(splitted[1], splitted[0]), weight: weight})
                    this.gradientMax=16638;
                }
                this.heatmap.setMap(this.map);

            },err=>{
                if(err==='Unauthorized'){
                    console.log('unauthorized and redirecting');
                    this._router.navigate(['/login']);
                }
            } );

        }
    }
    getMyStyles() {
        let myStyle = {'background':'linear-gradient(to '+this.leftToRightGradient+', rgba(255,0,0,1) 0%, rgba(251, 109,0,1) 25%, rgba(254, 189, 0,1) 50%, rgba(209, 252, 1,1) 75%, rgba(11, 255, 0,1) 100%)'}
        return myStyle;
    }


}