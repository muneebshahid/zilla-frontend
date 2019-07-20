import { Component, OnInit, Input, ViewChildren, QueryList, AfterViewInit } from "@angular/core";
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

  public endpoint: string = environment.apiEndpoint;
  @ViewChildren("galleryItem") galleryItems: QueryList<any>;
  @ViewChildren("imageWrapper") imageWrapper: QueryList<any>;

  constructor() {}

  ngAfterViewInit() {
    this.imageWrapper.changes.subscribe(t => {
      this.ngForRendred();
    });
  }

  ngForRendred() {
    apusCore(jQuery, 2);
    var $images = jQuery(".image-wrapper:not(.image-loaded) .unveil-image"); // Get un-loaded images only
    $images.unveil(1, function() {
      jQuery(this).load(function() {
        jQuery(this)
          .parents(".image-wrapper")
          .first()
          .addClass("image-loaded");
        jQuery(this).removeAttr("data-src");
        jQuery(this).removeAttr("data-srcset");
        jQuery(this).removeAttr("data-sizes");
      });
    });
  }

  ngOnInit() {}
}
