import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../services/http/http.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  constructor(private httpservice: HttpService) {}

  ngOnInit() {}

  addListing() {
    console.log(this.httpservice.getPosts());
  }
}
