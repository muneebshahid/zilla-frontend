import { IProduct } from "src/app/models/product";
import { Component, OnInit, Input, AfterViewInit } from "@angular/core";
import { environment } from "src/environments/environment";

declare var jQuery: any;

@Component({
  selector: "app-business-detail-menu",
  templateUrl: "./business-detail-menu.component.html",
  styleUrls: ["./business-detail-menu.component.css"]
})
export class BusinessDetailMenuComponent implements OnInit {
  @Input() products: IProduct[];
  public endpoint: string = environment.apiEndpoint;

  chevronState = [
    { collapsed: true, class: ".menu0" },
    { collapsed: true, class: ".menu1" },
    { collapsed: true, class: ".menu2" }
  ];

  constructor() {}

  ngOnInit() {}

  toggleCollapseIcon(index) {
    jQuery(this.chevronState[index].class).collapse("toggle");

    if (this.chevronState[index].collapsed === false) {
      this.chevronState[index].collapsed = true;
    } else {
      this.chevronState[index].collapsed = false;
    }
  }
}
