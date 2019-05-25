import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-detail-map',
  templateUrl: './business-detail-map.component.html',
  styleUrls: ['./business-detail-map.component.css']
})
export class BusinessDetailMapComponent implements OnInit {
  mapClass = 'agm-map-detail';

  constructor() { }

  ngOnInit() {
  }

}
