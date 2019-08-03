import {
  DetailHeaderGalleryComponent,
  DetailHeaderComponent,
  BusinessDetailContainerComponent
} from "./../../testing/dummy_components";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HomeDetailDrawerComponent } from "./home-detail-drawer.component";
import { StoreModule } from "@ngrx/store";
import { appReducers } from "src/app/store/reducers/app.reducer";

describe("HomeDetailDrawerComponent", () => {
  let component: HomeDetailDrawerComponent;
  let fixture: ComponentFixture<HomeDetailDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeDetailDrawerComponent,
        DetailHeaderGalleryComponent,
        DetailHeaderComponent,
        BusinessDetailContainerComponent
      ],
      imports: [StoreModule.forRoot(appReducers)]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDetailDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
