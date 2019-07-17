import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ViewChildren,
  QueryList,
  SimpleChanges,
  OnChanges
} from "@angular/core";
import { environment } from "src/environments/environment";
declare var jQuery: any;
declare var apusCore: any;
@Component({
  selector: "app-detail-header-gallery",
  templateUrl: "./detail-header-gallery.component.html",
  styleUrls: ["./detail-header-gallery.component.css"]
})
export class DetailHeaderGalleryComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() images: Array<string>;
  public endpoint: string = environment.apiEndpoint;
  @ViewChildren("galleryItem") galleryItems: QueryList<any>;
  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.images.currentValue !== null) {
      apusCore(jQuery, 2);
    }
  }

  ngOnInit() {}
  ngAfterViewInit() {
    this.galleryItems.changes.subscribe(t => {
      // this.ngForRendred();
    });
  }
  ngForRendred() {
    apusCore(jQuery, 2);
  }
}
