import { Component, OnInit, Input, AfterViewInit, ViewChildren, QueryList } from "@angular/core";
import { environment } from "src/environments/environment";
declare var jQuery: any;

@Component({
  selector: "app-business-detail-header-gallery",
  templateUrl: "./business-detail-header-gallery.component.html",
  styleUrls: ["./business-detail-header-gallery.component.css"]
})
export class BusinessDetailHeaderGalleryComponent implements OnInit, AfterViewInit {
  @Input() images: Array<string>;
  public endpoint: string = environment.apiEndpoint;
  @ViewChildren("allTheseThings") things: QueryList<any>;
  constructor() {}

  ngOnInit() {}
  ngAfterViewInit() {
    this.things.changes.subscribe(t => {
      this.ngForRendred();
    });
  }
  ngForRendred() {
    apusCore(jQuery, 2);
  }
}
