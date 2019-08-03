import { HomeFilterDrawerComponent } from "./../../testing/dummy_components";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HomeDrawersContainerComponent } from "./home-drawers-container.component";
import { appReducers } from "src/app/store/reducers/app.reducer";
import { StoreModule } from "@ngrx/store";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("HomeDrawersContainerComponent", () => {
  let component: HomeDrawersContainerComponent;
  let fixture: ComponentFixture<HomeDrawersContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeDrawersContainerComponent, HomeFilterDrawerComponent],
      imports: [StoreModule.forRoot(appReducers), RouterTestingModule, HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDrawersContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
