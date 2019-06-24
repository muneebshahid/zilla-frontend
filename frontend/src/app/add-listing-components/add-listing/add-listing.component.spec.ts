import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AddListingComponent } from "./add-listing.component";
import { Component } from "@angular/core";

@Component({ selector: "app-general-info", template: "" })
class GeneralInfo {}

@Component({ selector: "app-opening-closing-hours", template: "" })
class OpeningClosingHoursComponent {}

@Component({ selector: "app-location", template: "" })
class LocationComponent {}

@Component({ selector: "app-menu", template: "" })
class MenuComponent {}

@Component({ selector: "app-add-menu", template: "" })
class AddMenuComponent {}

@Component({ selector: "app-add-media", template: "" })
class AddMediaComponent {}

@Component({ selector: "app-add-social-links", template: "" })
class AddSocialLinksComponent {}

@Component({ selector: "app-listing-tags", template: "" })
class ListingTagsComponent {}

describe("AddListingComponent", () => {
  let component: AddListingComponent;
  let fixture: ComponentFixture<AddListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddListingComponent,
        GeneralInfo,
        OpeningClosingHoursComponent,
        LocationComponent,
        MenuComponent,
        AddMenuComponent,
        AddMediaComponent,
        AddSocialLinksComponent,
        ListingTagsComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
