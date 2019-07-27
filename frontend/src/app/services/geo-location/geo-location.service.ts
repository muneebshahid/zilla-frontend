import { Injectable, NgZone, ElementRef } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { MapsAPILoader } from "@agm/core";

@Injectable()
export class GeoLocationService {
  coordinates: any;
  loadedMap: any;

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
              observer.next(error);
              observer.complete();
              break;
            case 2:
              observer.next(error);
              observer.complete();
              // ...device can't get data
              break;
            case 1:
              observer.next(error);
              observer.complete();
              break;
            // ...user said no ☹️
            default:
              observer.next(error);
              observer.complete();
          }
        },
        { timeout: 1000, enableHighAccuracy: true }
      );
      // navigator.geolocation.getCurrentPosition(this.displayLocationInfo, this.handleLocationError, {
      //   timeout: 5000
      // });
    });
  }

  getSearchCities(locationElementRef: ElementRef, types: any): Observable<any> {
    return Observable.create(observer => {
      this.loadedMap = this.mapsAPILoader.load();

      this.loadedMap.then(() => {
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

  getCityFromLatLng(latlng: Array<number>) {
    return Observable.create(observer => {
      this.loadedMap.then(() => {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: { lat: latlng[0], lng: latlng[1] } }, function(
          results,
          status
        ) {
          if (status == google.maps.GeocoderStatus.OK) {
            var result;
            if (results.length > 1) {
              result = results[1];
            } else {
              result = results[0];
            }
            observer.next(result.address_components[3].short_name);
          }
        });
      });
    });
  }
}
