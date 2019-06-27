import { IBusiness } from "./../../models/business";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ExploreProductsComponent } from "./explore-products.component";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { IProduct } from "src/app/models/product";
import { IAppState } from "src/app/store/state/app.state";
import { Store, MemoizedSelector } from "@ngrx/store";
import { selectBusinesses, selectBusiness } from "src/app/store/selectors/business";
import { selectProducts, selectProduct } from "src/app/store/selectors/product";

describe("ExploreProductsComponent", () => {
  let component: ExploreProductsComponent;
  let fixture: ComponentFixture<ExploreProductsComponent>;
  let store: MockStore<IAppState>;

  let mock_selectBusinesses: MemoizedSelector<IAppState, boolean>;
  let mock_selectBusiness: MemoizedSelector<IAppState, boolean>;
  let mock_selectProducts: MemoizedSelector<IAppState, boolean>;
  let mock_selectProduct: MemoizedSelector<IAppState, boolean>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExploreProductsComponent],
      providers: [provideMockStore()]
    });

    store = TestBed.get(Store);

    mock_selectBusinesses = store.overrideSelector(selectBusinesses, false);
    mock_selectBusiness = store.overrideSelector(selectBusiness, false);
    mock_selectProducts = store.overrideSelector(selectProducts, false);
    mock_selectProduct = store.overrideSelector(selectProduct, false);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
