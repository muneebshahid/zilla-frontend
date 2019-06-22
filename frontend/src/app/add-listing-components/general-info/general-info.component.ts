import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-general-info",
  templateUrl: "./general-info.component.html",
  styleUrls: ["./general-info.component.css"]
})
export class GeneralInfoComponent implements OnInit {
  cities2 = [
    { id: 1, name: "Vilnius" },
    { id: 2, name: "Kaunas" },
    { id: 3, name: "Pavilnys", disabled: true },
    { id: 4, name: "Pabradė" },
    { id: 5, name: "Klaipėda" }
  ];

  constructor() {}

  ngOnInit() {}
}
