import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, Input } from "@angular/core";

import { ExploreComponent } from "./explore.component";
@Component({ selector: "app-m-home-menu-drawer", template: "" })
class MHomeMenuDrawerComponent {}

@Component({ selector: "app-m-filter-map-menu", template: "" })
class MFilterMapMenuComponent {
  @Input() searchBarEnabled: boolean = false;
}

@Component({ selector: "app-m-menu", template: "" })
class MMenuComponent {}

describe("ExploreComponent", () => {
  let component: ExploreComponent;
  let fixture: ComponentFixture<ExploreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExploreComponent,
        MHomeMenuDrawerComponent,
        MFilterMapMenuComponent,
        MMenuComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
