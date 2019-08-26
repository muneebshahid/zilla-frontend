import { Component, OnInit, Input, SimpleChanges, OnChanges } from "@angular/core";
import { IBusiness } from "src/app/models/business";
import { environment } from "src/environments/environment";
import { IProduct } from "src/app/models/product";

@Component({
  selector: "app-info-detail",
  templateUrl: "./info-detail.component.html",
  styleUrls: ["./info-detail.component.css"]
})
export class InfoDetailComponent implements OnInit, OnChanges {
  @Input() business: IBusiness;
  @Input() product: IProduct;

  @Input() isBusinessShowing: boolean = false;
  public endpoint = environment.apiEndpoint;
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    // const name: SimpleChange = changes.name;
    // console.log(changes);
  }
}
