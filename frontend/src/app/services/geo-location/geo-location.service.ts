import { IGFilters } from "./../../models/general_filters";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { IAppState } from "src/app/store/state/app.state";

@Injectable()
export class GeoLocationService {
  coordinates: any;

  constructor() {}

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



  
}
