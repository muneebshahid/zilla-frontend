import { IProduct } from "src/app/models/product";
import { Component, OnInit, Input } from "@angular/core";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-business-detail-menu",
  templateUrl: "./business-detail-menu.component.html",
  styleUrls: ["./business-detail-menu.component.css"]
})
export class BusinessDetailMenuComponent implements OnInit {
  @Input() products: IProduct[];
  public endpoint: string = environment.apiEndpoint;
  constructor() {}

  ngOnInit() {}
}
