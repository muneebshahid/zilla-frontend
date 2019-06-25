import { IProduct } from "src/app/models/product";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, Input } from "@angular/core";

import { ProductDetailComponent } from "./product-detail.component";
import { IImage } from "src/app/models/image";
import { provideMockStore, MockStore } from "@ngrx/store/testing";

@Component({ selector: "app-m-home-menu-drawer", template: "" })
class MHomeMenuDrawerComponent {}
@Component({ selector: "app-m-menu", template: "" })
class MMenuComponent {}

@Component({ selector: "app-m-filter-map-menu", template: "" })
class MFilterMapMenuComponent {
  @Input() searchBarEnabled: boolean = false;
}

@Component({ selector: "app-menu", template: "" })
class MenuComponent {}
@Component({ selector: "app-footer", template: "" })
class FooterComponent {}

@Component({ selector: "app-detail-header-gallery", template: "" })
class DetailHeaderGalleryComponent {
  @Input() images: IImage[];
}

@Component({ selector: "app-detail-header", template: "" })
class DetailHeaderComponent {
  @Input() type: any;
  @Input() description: string;
  @Input() title: string;
  @Input() address: string;
  @Input() phone: string;
  @Input() expensive: number;
  @Input() tags: Array<string>;
  @Input() open_or_available: string = "Closed";
  @Input() is_open_or_available: boolean = true;
}

describe("ProductDetailComponent", () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let store: MockStore<{ product: IProduct[] }>;
  const initialState = { product: null };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductDetailComponent,
        MHomeMenuDrawerComponent,
        MMenuComponent,
        MenuComponent,
        DetailHeaderGalleryComponent,
        DetailHeaderComponent,
        FooterComponent
      ],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
