import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NgSelectModule } from "@ng-select/ng-select";
import { GeneralInfoComponent } from "./general-info.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

describe("GeneralInfoComponent", () => {
  let component: GeneralInfoComponent;
  let fixture: ComponentFixture<GeneralInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralInfoComponent],
      imports: [NgSelectModule, FormsModule, ReactiveFormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should ensure all labels are named correctly", () => {
    const listingElementDe: DebugElement = fixture.debugElement;

    const listingNameDe = listingElementDe.query(By.css(".listing-name"));
    const listingDescriptionDe = listingElementDe.query(By.css(".listing-description"));
    const listingCategoryDe = listingElementDe.query(By.css(".listing-category"));
    const listingPriceRangeDe = listingElementDe.query(By.css(".price-range"));
    const listingPriceFromDe = listingElementDe.query(By.css(".price-from"));
    const listingPriceToDe = listingElementDe.query(By.css(".price-to"));
    const listingAmenitiesDe = listingElementDe.query(By.css(".listing-amenities"));

    const listingName: HTMLElement = listingNameDe.nativeElement;
    const listingDescription: HTMLElement = listingDescriptionDe.nativeElement;
    const listingCategory: HTMLElement = listingCategoryDe.nativeElement;
    const listingPriceRange = listingPriceRangeDe.nativeElement;
    const listingPriceFrom: HTMLElement = listingPriceFromDe.nativeElement;
    const listingPriceTo: HTMLElement = listingPriceToDe.nativeElement;
    const listingAmenities: HTMLElement = listingAmenitiesDe.nativeElement;

    expect(listingName.textContent).toEqual("Listing Name *");
    expect(listingDescription.textContent).toEqual("Description");
    expect(listingCategory.textContent).toEqual("Listing Category*");
    expect(listingPriceRange.textContent).toEqual("Price Range");
    expect(listingPriceFrom.textContent).toEqual("Price From");
    expect(listingPriceTo.textContent).toEqual("Price To");
    expect(listingAmenities.textContent).toEqual("Listing Amenities");
  });
});
