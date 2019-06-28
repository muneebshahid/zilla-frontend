import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ExploreProductsComponent } from "./explore-products.component";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { IAppState } from "src/app/store/state/app.state";
import { Store, StoreModule } from "@ngrx/store";
import { appReducers } from "src/app/store/reducers/app.reducer";

describe("ExploreProductsComponent", () => {
  let component: ExploreProductsComponent;
  let fixture: ComponentFixture<ExploreProductsComponent>;
  let store: MockStore<IAppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExploreProductsComponent],
      providers: [provideMockStore()],
      imports: [StoreModule.forRoot(appReducers)]
    });

    store = TestBed.get(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    fixture.destroy();
  });
  // it("should create", () => {
  //   expect(component).toBeTruthy();
  // });
});
