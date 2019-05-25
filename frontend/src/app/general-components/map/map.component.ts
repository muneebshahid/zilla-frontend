import { Component, Input, ViewChild, NgZone, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
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
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() mapClass;

  geocoder:any;
  location: Location;
  markers: Array<Marker> = [];
  showFiller = false;


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
    this.markers.push(this.createMarker(48.1548894, 11.4716248))
    this.markers.push(this.createMarker(48.2548894, 11.4716248))
    this.markers.push(this.createMarker(48.3548894, 11.4716248))
    this.markers.push(this.createMarker(48.4548894, 11.4716248))

    this.location = {
      lng: 42.1548894,
      lat: 11.4716248,
      zoom: 10
    };

  }
  tabClick(e){
    console.log(e);
  }


  createMarker(lat, lng){
    return { 
      lat: lat,
      lng: lng,
      draggable: false,
      //icon: 'HTTP URL'
    }
  }


}
