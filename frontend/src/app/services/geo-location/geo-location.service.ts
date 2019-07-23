import { IGFilters } from "./../../models/general_filters";
import { Injectable, NgZone, ElementRef } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { IAppState } from "src/app/store/state/app.state";
import { MapsAPILoader } from "@agm/core";

@Injectable()
export class GeoLocationService {
  coordinates: any;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {}

  public getPosition(): Observable<Position> {
    return Observable.create(observer => {
      navigator.geolocation.getCurrentPosition(
        (pos: Position) => {
          observer.next(pos);
        },
        error => {
          switch (error.code) {
            case 3:
              // ...deal with timeout
              break;
            case 2:
              // ...device can't get data
              break;
            case 1:
            // ...user said no ☹️
            default:
              observer.next(error);
          }
        },
        { timeout: 2000 }
      );
      // navigator.geolocation.getCurrentPosition(this.displayLocationInfo, this.handleLocationError, {
      //   timeout: 5000
      // });
    });
  }

  getSearchCities(locationElementRef: ElementRef, types: any): Observable<any> {
    return Observable.create(observer => {
      this.mapsAPILoader.load().then(() => {
        let autocomplete = new google.maps.places.Autocomplete(locationElementRef.nativeElement, {
          types: types
        });
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();

            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            observer.next(place);
          });
        });
      });
    });
  }
}
