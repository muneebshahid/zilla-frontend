import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BusinessDetailComponent } from "./business-detail.component";
import { Component, Input } from "@angular/core";
import { IBusiness } from "src/app/models/business";
import { StoreModule } from "@ngrx/store";
import { RouterTestingModule } from "@angular/router/testing";
import { provideMockStore, MockStore } from "@ngrx/store/testing";

@Component({ selector: "app-m-home-menu-drawer", template: "" })
class MHomeMenuDrawerComponent {}

@Component({ selector: "app-m-menu", template: "" })
class MMenuComponent {}

@Component({ selector: "app-menu", template: "" })
class MenuComponent {}

@Component({ selector: "app-detail-header-gallery", template: "" })
class DetailHeaderGalleryComponent {
  @Input() images: Array<string>;
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

@Component({ selector: "app-business-detail-container", template: "" })
class BusinessDetailContainerComponent {
  @Input() business: IBusiness;
}

@Component({ selector: "app-footer", template: "" })
class FooterComponent {}

describe("BusinessDetailComponent", () => {
  let component: BusinessDetailComponent;
  let fixture: ComponentFixture<BusinessDetailComponent>;
  let store: MockStore<{ loggedIn: boolean }>;
  const initialState = { loggedIn: false };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BusinessDetailComponent,
        MHomeMenuDrawerComponent,
        MMenuComponent,
        MenuComponent,
        DetailHeaderGalleryComponent,
        DetailHeaderComponent,
        BusinessDetailContainerComponent,
        FooterComponent
      ],
      imports: [RouterTestingModule],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
