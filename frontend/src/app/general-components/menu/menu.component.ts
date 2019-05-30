import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../services/http/http.service";
import { Store } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { GetProductDetails } from "src/app/store/actions/product";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  constructor(private httpservice: HttpService, private _store: Store<IAppState>) {}

  ngOnInit() {}

  addListing() {
    // console.log(this.httpservice.getPosts());
    this._store.dispatch(new GetProductDetails(999));
  }
}
