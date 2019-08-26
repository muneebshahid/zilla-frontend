import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { IBusiness } from "src/app/models/business";
import { environment } from "src/environments/environment";
import { IProduct } from "src/app/models/product";

@Component({
  selector: "app-info-detail",
  templateUrl: "./info-detail.component.html",
  styleUrls: ["./info-detail.component.css"]
})
export class InfoDetailComponent implements OnInit {
  @Input() business: IBusiness;
  @Input() product: IProduct;
  @Output() public addSearchFilterForType = new EventEmitter<number>();
  @Output() public addSearchFilterForTag = new EventEmitter<number>();

  @Input() isBusinessShowing: boolean = false;
  public endpoint = environment.apiEndpoint;
  constructor() {}

  ngOnInit() {}

  searchByType(typeId) {
    this.addSearchFilterForType.emit(typeId);
  }
  searchByTag(tagId) {
    this.addSearchFilterForTag.emit(tagId);
  }
}
