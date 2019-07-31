import { Component, OnInit, Input } from "@angular/core";
import { LocationService } from "src/app/services/location/location.service";
import { SocialService } from "ngx-social-button";

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

  private shareObj = {
    href: "",
    hashtag: "#businessListing"
  };

  constructor(private location: LocationService, private socialAuthService: SocialService) {}

  ngOnInit() {}

  shareOnFacebook() {
    this.shareObj.href = this.location.getCurrentLocation() + "/";
    this.socialAuthService.facebookSharing(this.shareObj);
  }
}
