import { Component, OnInit, Input } from "@angular/core";
import { IProduct } from "src/app/models/product";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-product-info",
  templateUrl: "./product-info.component.html",
  styleUrls: ["./product-info.component.css"]
})
export class ProductInfoComponent implements OnInit {
  @Input() public products: IProduct[];
  @Input() public homePage = false;

  public endpoint = environment.apiEndpoint;

  constructor() {}

  ngOnInit() {}
}
