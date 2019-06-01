import { Component, OnInit, Input } from "@angular/core";
import { IProduct } from "src/app/models/product";

@Component({
  selector: "app-home-product-info",
  templateUrl: "./home-product-info.component.html",
  styleUrls: ["./home-product-info.component.css"]
})
export class HomeProductInfoComponent implements OnInit {
  @Input() product: IProduct;

  constructor() {}

  ngOnInit() {}
}
