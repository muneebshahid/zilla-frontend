import { Component, OnInit, Input, AfterViewInit, ViewChildren, QueryList } from "@angular/core";
import { environment } from "src/environments/environment";
declare var jQuery: any;
declare var apusCore: any;
@Component({
  selector: "app-detail-header-gallery",
  templateUrl: "./detail-header-gallery.component.html",
  styleUrls: ["./detail-header-gallery.component.css"]
})
export class DetailHeaderGalleryComponent implements OnInit, AfterViewInit {
  @Input() images: Array<string>;
  @ViewChildren("galleryItem") galleryItems: QueryList<any>;

  public endpoint: string = environment.apiEndpoint;
  constructor() {}

  ngOnInit() {}
  ngAfterViewInit() {
    this.galleryItems.changes.subscribe(t => {
      this.ngForRendred();
    });
  }
  ngForRendred() {
    apusCore(jQuery, 2);
  }
}
