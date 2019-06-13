import { Component, OnInit, Input } from "@angular/core";
import { IProduct } from "src/app/models/product";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-explore-products",
  templateUrl: "./explore-products.component.html",
  styleUrls: ["./explore-products.component.css"]
})
export class ExploreProductsComponent implements OnInit {
  productsLoading = false;
  @Input() products: IProduct[];
  endpoint = environment.apiEndpoint;

  constructor() {}

  ngOnInit() {}
}
