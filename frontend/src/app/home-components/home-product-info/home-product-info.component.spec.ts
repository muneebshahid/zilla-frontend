import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, Input } from "@angular/core";

import { HomeProductInfoComponent } from "./home-product-info.component";
import { IProduct } from "src/app/models/product";

describe("HomeProductInfoComponent", () => {
  let component: HomeProductInfoComponent;
  let fixture: ComponentFixture<HomeProductInfoComponent>;
  const product: IProduct = {
    product: 0,
    tags: [{ tag: "0", slug: "halal" }],
    images: [{ file: "TEST IMAGE PATH" }],
    latlng: [0, 1],
    title: "DUMMY TITLE",
    slug: "DUMMY SLUG",
    description: "DUMMY DESCRIPTION",
    price: 20,
    available: true,
    product_type: { tag: "DUMMY TAG", slug: "DUMMY SLUG", icon: "DUMMY ICON" },
    owner: 2,
    expensive: 23
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeProductInfoComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProductInfoComponent);
    component = fixture.componentInstance;

    component.product = product;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
