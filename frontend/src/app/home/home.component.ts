import { Component, Input, ViewChild, NgZone, OnInit } from '@angular/core';
import { MapsAPILoader, AgmMap, AgmMarker } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
import { last } from '@angular/router/src/utils/collection';
 
declare var google: any;
 
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  icon?: string;
  draggable: boolean;
}
 
interface Location {
  lat: number;
  lng: number;
  zoom: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  geocoder:any;
  location: Location;
  markers: Array<Marker> = [];

  @ViewChild(AgmMap) map: AgmMap;

  constructor(public mapsApiLoader: MapsAPILoader,
    private zone: NgZone,
    private wrapper: GoogleMapsAPIWrapper) {
      this.mapsApiLoader = mapsApiLoader;
      this.zone = zone;
      this.wrapper = wrapper;
      this.mapsApiLoader.load().then(() => {
      });
  }

  ngOnInit() {
    // dummy markers
    this.markers.push(this.createMarker(51.678418, 7.809007))
    this.markers.push(this.createMarker(52.678418, 7.809007))
    this.markers.push(this.createMarker(53.678418, 7.809007))
    this.markers.push(this.createMarker(54.678418, 7.809007))

    this.location = {
      lng: 48.1548894,
      lat: 11.4716248,
      zoom: 12
    };

  }


  createMarker(lat, lng){
    return { 
      lat: lat,
      lng: lng,
      draggable: false,
    }
  }

}