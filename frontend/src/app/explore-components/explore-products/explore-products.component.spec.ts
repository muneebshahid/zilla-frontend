import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ExploreProductsComponent } from "./explore-products.component";

describe("ExploreProductsComponent", () => {
  let component: ExploreProductsComponent;
  let fixture: ComponentFixture<ExploreProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExploreProductsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
