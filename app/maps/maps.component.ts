import { Component, OnInit, ViewChild } from '@angular/core';
import {HeatmapLayer} from '@ngui/map';
import {DataService} from "../_services/data.service";
import {Router} from "@angular/router";



import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { NguiMapComponent } from '@ngui/map';

declare var google: any;


@Component({
    templateUrl: 'maps.component.html',
    styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit{
    @ViewChild(HeatmapLayer) heatmaplayer : HeatmapLayer;
    heatmap: google.maps.visualization.HeatmapLayer;
    map: google.maps.Map;
    points : any= [
        // {location: new google.maps.LatLng(38.039319999999975, 23.8508), weight: 1},
        // {location: new google.maps.LatLng(38.03180999999995, 23.9843), weight: 10},
    ];

    // heatmapData : any = [
    //     // WeightedLocation objects
    //     {location: new google.maps.LatLng(23.8508, 38.039319999999975), weight: 1},
    //     {location: new google.maps.LatLng(23.9843, 38.03180999999995), weight: 1},
    // ];
    constructor( private _dataservice : DataService,
                 private _router : Router
    ){}


    ngOnInit() {
        this._dataservice.getPoints("wind").subscribe(res=>{
            for(let r of res.features){
                let splitted = r.geometry.coordinates.toString().split(",",2);
                // let weight = Math.floor(r.properties.dl_bitrate/1664)+1;
                let weight = r.properties.dl_bitrate;
                this.points.push({location: new google.maps.LatLng(splitted[1], splitted[0]), weight: weight})
            }
            this.heatmap.setMap(this.map);
            // this.heatmap.set('maxIntensity', 10);
            // this.heatmap.set('dissipating', false);
            console.log("to points 0 einai: "+(JSON.stringify(this.points[0])))
            console.log("to points 1 einai: "+(JSON.stringify(this.points[1])))
            console.log('to opacity einai: '+this.heatmap.get('opacity'))
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

        });
        // this.heatmap.set('radius',1)

    }

    toggleHeatmap() {
        this.heatmap.setMap(this.heatmap.getMap() ? null : this.map);
    }
    changeGradient() {
        let gradient = [
            'rgba(0, 255, 255, 0)',
            'rgba(0, 255, 255, 1)',
            'rgba(0, 191, 255, 1)',
            'rgba(0, 127, 255, 1)',
            'rgba(0, 63, 255, 1)',
            'rgba(0, 0, 255, 1)',
            'rgba(0, 0, 223, 1)',
            'rgba(0, 0, 191, 1)',
            'rgba(0, 0, 159, 1)',
            'rgba(0, 0, 127, 1)',
            'rgba(63, 0, 91, 1)',
            'rgba(127, 0, 63, 1)',
            'rgba(191, 0, 31, 1)',
            'rgba(255, 0, 0, 1)'
        ];
        this.heatmap.set('gradient', this.heatmap.get('gradient') ? null : gradient);
    }
    changeRadius() {
        this.heatmap.set('radius', this.heatmap.get('radius') ? null : 5);
    }

    changeOpacity() {
        this.heatmap.set('opacity', this.heatmap.get('opacity') ? null : 0.2);
    }
    onZoomChange(event : any){
        console.log(event);
    }

    onMapClick(event : any) {
        console.log(event);
    }
    //
    // loadRandomPoints() {
    //     this.points = [];
    //
    //     for (let i = 0 ; i < 9; i++) {
    //         this.addPoint();
    //     }
    // }
    //
    // addPoint() {
    //     let randomLat = Math.random() * 0.0099 + 37.782551;
    //     let randomLng = Math.random() * 0.0099 + -122.445368;
    //     let randomWgt = Math.random() * 10;
    //     let latlng = new google.maps.LatLng(randomLat, randomLng);
    //     this.points.push(latlng);
    //     // this.points.push({location: latlng, weight: randomWgt},);
    // }
    // onMapReady(map:any) {
    //     console.log('map', map);
    //     console.log('markers', map.markers);  // to get all markers as an array
    // }

}