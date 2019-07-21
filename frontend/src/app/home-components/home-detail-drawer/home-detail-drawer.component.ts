import { Component, OnInit, HostListener, Input, Output, EventEmitter } from "@angular/core";
import { IBusiness } from "src/app/models/business";

@Component({
  selector: "app-home-detail-drawer",
  templateUrl: "./home-detail-drawer.component.html",
  styleUrls: ["./home-detail-drawer.component.css"]
})
export class HomeDetailDrawerComponent implements OnInit {
  @Input() public business: IBusiness;
  @Input() public isActive: boolean = false;
  // @Output() closeDetailDrawer = new EventEmitter<boolean>();

  ngOnInit() {}

  @HostListener("document:click")
  clickout() {
    // this.closeDetailDrawer.next(true);
    console.log("wah");
  }
}
