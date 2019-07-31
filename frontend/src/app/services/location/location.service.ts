import { Injectable } from "@angular/core";
import { Location } from "@angular/common";

@Injectable({
  providedIn: "root"
})
export class LocationService {
  constructor(private location: Location) {}

  setDetailLocation(id: number, type: string) {
    this.location.replaceState(`${type}/${id}`);
  }
  clearLocation() {
    this.location.replaceState(`/`);
  }

  getCurrentLocation() {
    return window.location.href;
  }
}
