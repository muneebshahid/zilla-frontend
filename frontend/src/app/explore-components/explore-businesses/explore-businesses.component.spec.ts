import { IBusiness } from "./../../models/business";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ExploreBusinessesComponent } from "./explore-businesses.component";
import { provideMockStore, MockStore } from "@ngrx/store/testing";

describe("ExploreBusinessesComponent", () => {
  let component: ExploreBusinessesComponent;
  let fixture: ComponentFixture<ExploreBusinessesComponent>;
  let store: MockStore<{ businesses: IBusiness[] }>;
  const initialState = { businesses: null };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExploreBusinessesComponent],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreBusinessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
