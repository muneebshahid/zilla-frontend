import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, Input } from "@angular/core";

import { HomeProductInfoComponent } from "./home-product-info.component";
import { IProduct } from "src/app/models/product";

describe("HomeProductInfoComponent", () => {
  let component: HomeProductInfoComponent;
  let fixture: ComponentFixture<HomeProductInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeProductInfoComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProductInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
