import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BusinessDetailComponent } from "./business-detail.component";
import { Component, Input } from "@angular/core";
import { IBusiness } from "src/app/models/business";
import { StoreModule } from "@ngrx/store";
import { RouterTestingModule } from "@angular/router/testing";
import { appReducers } from "src/app/store/reducers/app.reducer";
import {
  MHomeMenuDrawerComponent,
  MMenuComponent,
  MenuComponent,
  DetailHeaderGalleryComponent,
  BusinessDetailContainerComponent,
  FooterComponent
} from "src/app/testing/dummy_components";

@Component({ selector: "app-detail-header", template: "" })
class DetailHeaderComponent {
  @Input() type: any;
  @Input() description: string;
  @Input() title: string;
  @Input() address: string;
  @Input() phone: string;
  @Input() tags: Array<string>;
  @Input() open_or_available: string = "Closed";
  @Input() is_open_or_available: boolean = true;
}

describe("BusinessDetailComponent", () => {
  let component: BusinessDetailComponent;
  let fixture: ComponentFixture<BusinessDetailComponent>;

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
      imports: [RouterTestingModule, StoreModule.forRoot(appReducers)]
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
