import {
  Component,
  OnInit,
  HostListener,
  Input,
  Output,
  EventEmitter,
  Inject,
  ElementRef
} from "@angular/core";
import { IBusiness } from "src/app/models/business";
import { DOCUMENT } from "@angular/platform-browser";
import { UpdateCloseDetailDrawer } from "src/app/store/actions/general";
import { IAppState } from "src/app/store/state/app.state";
import { Store } from "@ngrx/store";

declare var jQuery: any;
@Component({
  selector: "app-home-detail-drawer",
  templateUrl: "./home-detail-drawer.component.html",
  styleUrls: ["./home-detail-drawer.component.css"]
})
export class HomeDetailDrawerComponent implements OnInit {
  @Input() public business: IBusiness;
  @Input() public isActive: boolean = false;
  @Output() closeDetailDrawer = new EventEmitter<boolean>();

  constructor(
    @Inject(DOCUMENT) private document: any,
    private eRef: ElementRef,
    private store: Store<IAppState>
  ) {}

  lastState = "pop up was not open";
  ngOnInit() {}

  @HostListener("document:click")
  clickout() {
    var self = this;

    if (this.eRef.nativeElement.contains(event.target)) {
      let classList = jQuery(this.document.body)
        .attr("class")
        .split(/\s+/);

      for (var i = 0; i < classList.length; i++) {
        if (classList[i] === "mfp-zoom-out-cur") {
          self.lastState = "popup was open";
          break;
        }
      }
    } else {
      if (this.lastState !== "popup was open") {
        this.isActive = false;

        self.store.dispatch(new UpdateCloseDetailDrawer(true));
      } else {
        this.lastState = "pop up was not open";
      }
    }
  }
}
