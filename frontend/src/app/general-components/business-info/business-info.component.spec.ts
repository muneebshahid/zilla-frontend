import { LocationService } from "./../../services/location/location.service";
import { BusinessService } from "./../../services/business/business.service";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BusinessInfoComponent } from "./business-info.component";
import { StoreModule } from "@ngrx/store";
import { appReducers } from "src/app/store/reducers/app.reducer";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

describe("BusinessInfoComponent", () => {
  let component: BusinessInfoComponent;
  let fixture: ComponentFixture<BusinessInfoComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [BusinessInfoComponent],
      imports: [StoreModule.forRoot(appReducers), HttpClientTestingModule, RouterTestingModule],
      providers: [BusinessService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
