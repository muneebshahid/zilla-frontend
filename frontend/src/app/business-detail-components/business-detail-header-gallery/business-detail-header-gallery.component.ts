import { Component, OnInit, Input } from "@angular/core";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-business-detail-header-gallery",
  templateUrl: "./business-detail-header-gallery.component.html",
  styleUrls: ["./business-detail-header-gallery.component.css"]
})
export class BusinessDetailHeaderGalleryComponent implements OnInit {
  @Input() images: Array<string>;
  public endpoint: string = environment.apiEndpoint;
  constructor() {}

  ngOnInit() {}
}
