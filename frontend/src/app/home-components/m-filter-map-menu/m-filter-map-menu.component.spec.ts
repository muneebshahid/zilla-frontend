import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MFilterMapMenuComponent } from "./m-filter-map-menu.component";

describe("MFilterMapMenuComponent", () => {
  let component: MFilterMapMenuComponent;
  let fixture: ComponentFixture<MFilterMapMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MFilterMapMenuComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MFilterMapMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should assign the correct value to productViewBtnText", () => {
    component.productViewBtnText = "Products";
    component.productViewClicked();
    expect(component.productViewBtnText).toBe("Businesses");
    component.productViewClicked();
    expect(component.productViewBtnText).toBe("Products");
  });
  it("should emit setMobileMapView option for mobile screen size", () => {
    let emitterSpy = spyOn(component.setMobileMapView, "next");
    component.updateMobileMapView();
    expect(emitterSpy).toHaveBeenCalled();
  });
});
