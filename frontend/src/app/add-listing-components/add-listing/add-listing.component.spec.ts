import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AddListingComponent } from "./add-listing.component";
import {
  GeneralInfoComponent,
  OpeningClosingHoursComponent,
  LocationComponent,
  MenuComponent,
  AddMenuComponent,
  AddMediaComponent,
  AddSocialLinksComponent,
  ListingTagsComponent
} from "src/app/testing/dummy_components";

describe("AddListingComponent", () => {
  let component: AddListingComponent;
  let fixture: ComponentFixture<AddListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddListingComponent,
        GeneralInfoComponent,
        OpeningClosingHoursComponent,
        LocationComponent,
        MenuComponent,
        AddMenuComponent,
        AddMediaComponent,
        AddSocialLinksComponent,
        ListingTagsComponent
      ],
      imports: []
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
