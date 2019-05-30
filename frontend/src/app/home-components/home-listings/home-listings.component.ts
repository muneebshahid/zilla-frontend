import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-home-listings',
  templateUrl: './home-listings.component.html',
  styleUrls: ['./home-listings.component.css']
})
export class HomeListingsComponent implements OnInit {
  constructor(public http: Http) {}

  baseUrl = '/api';

  ngOnInit() {}

  mozi(search: string = '') {
    return this.http
      .get(`${this.baseUrl}/hackers?q=${search}`)
      .toPromise()
      .then((res: Response) => res.json());
  }
}
