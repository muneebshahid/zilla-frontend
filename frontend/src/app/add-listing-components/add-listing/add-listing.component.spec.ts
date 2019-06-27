import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AddListingComponent } from "./add-listing.component";
import { Component } from "@angular/core";

@Component({ selector: "app-general-info", template: "" })
class GeneralInfoComponent {}

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

  it("should contain app-general-info components", () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("app-general-info")).not.toBe(null);
  });

  it("should contain app-opening-closing-hours components", () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("app-opening-closing-hours")).not.toBe(null);
  });

  it("should contain app-location components", () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("app-location")).not.toBe(null);
  });

  it("should contain app-add-menu components", () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("app-add-menu")).not.toBe(null);
  });

  it("should contain app-add-media components", () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("app-add-media")).not.toBe(null);
  });

  it("should contain app-add-social-links components", () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("app-add-social-links")).not.toBe(null);
  });

  it("should contain app-listing-tags components", () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("app-listing-tags")).not.toBe(null);
  });
});
