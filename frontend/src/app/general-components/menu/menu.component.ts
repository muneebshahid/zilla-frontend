import { Component, OnInit } from "@angular/core";
import { IAppState } from "src/app/store/state/app.state";
import { Store } from "@ngrx/store";
import { GetNearbyProducts } from "src/app/store/actions/product";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  constructor(private _store: Store<IAppState>) {}

  ngOnInit() {}

  addListing() {
    // console.log(this.httpservice.getPosts());
    this._store.dispatch(new GetNearbyProducts({ lat: 20, lng: 20 }));
  }
}
