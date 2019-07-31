import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, Input } from "@angular/core";

import { BusinessDetailMapComponent } from "./business-detail-map.component";
import { MapComponent } from "src/app/testing/dummy_components";

describe("BusinessDetailMapComponent", () => {
  let component: BusinessDetailMapComponent;
  let fixture: ComponentFixture<BusinessDetailMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessDetailMapComponent, MapComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDetailMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
