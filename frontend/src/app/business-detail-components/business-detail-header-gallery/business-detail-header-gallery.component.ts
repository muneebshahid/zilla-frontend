import { Component, OnInit, Input, AfterViewInit } from "@angular/core";
import { environment } from "src/environments/environment";
declare var jquery: any;
declare var $: any;

@Component({
  selector: "app-business-detail-header-gallery",
  templateUrl: "./business-detail-header-gallery.component.html",
  styleUrls: ["./business-detail-header-gallery.component.css"]
})
export class BusinessDetailHeaderGalleryComponent implements OnInit, AfterViewInit {
  @Input() images: Array<string>;
  public endpoint: string = environment.apiEndpoint;
  constructor() {}

  ngOnInit() {}
  ngAfterViewInit() {
    console.log($);
  }
}
