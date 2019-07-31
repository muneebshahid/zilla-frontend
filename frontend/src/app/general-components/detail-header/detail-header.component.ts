import { Component, OnInit, Input } from "@angular/core";
import { LocationService } from "src/app/services/location/location.service";
import { ShareService } from "@ngx-share/core";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-detail-header",
  templateUrl: "./detail-header.component.html",
  styleUrls: ["./detail-header.component.css"]
})
export class DetailHeaderComponent implements OnInit {
  @Input() type: any;
  @Input() description: string;
  @Input() title: string;
  @Input() address: string;
  @Input() phone: string;
  @Input() expensive: number;
  @Input() tags: Array<string>;
  @Input() open_or_available: string = "Closed";
  @Input() is_open_or_available: boolean = true;

  constructor(private location: LocationService, public share: ShareService) {}

  public ccc = faCoffee;

  ngOnInit() {}

  shareOnFacebook() {
    // this.shareObj.href = this.location.getCurrentLocation() + "/";
    // this.socialAuthService.facebookSharing(this.shareObj);
  }
}
