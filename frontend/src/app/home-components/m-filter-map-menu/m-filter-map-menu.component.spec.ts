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

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
