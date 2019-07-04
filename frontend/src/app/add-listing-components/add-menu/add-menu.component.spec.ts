import { async, ComponentFixture, TestBed, tick } from "@angular/core/testing";

import { AddMenuComponent } from "./add-menu.component";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
declare var jQuery: any;
describe("AddMenuComponent", () => {
  let component: AddMenuComponent;
  let fixture: ComponentFixture<AddMenuComponent>;
  let listingElementDe: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddMenuComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    listingElementDe = fixture.debugElement;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("add new menu link should add a new menu", () => {
    const addNewMenuDe = listingElementDe.query(By.css(".add-new-menu-price"));
    const menuItemDe = listingElementDe.query(By.css(".menu-prices-section-item-wrapper"));
    const removeNewMenuDe = listingElementDe.query(By.css(".remove-menu-price"));

    expect(menuItemDe.nativeElement.childNodes.length).toEqual(1);
    addNewMenuDe.nativeElement.click();
    expect(menuItemDe.nativeElement.childNodes.length).toEqual(2);
    removeNewMenuDe.nativeElement.click();
    expect(menuItemDe.nativeElement.childNodes.length).toEqual(1);
  });
  it("add new section link should add a new section", () => {
    const addNewSectionDe = listingElementDe.query(By.css(".add-new-section-menu-price"));
    const removeNewSectionDe = listingElementDe.query(By.css(".remove-section-menu-price"));
    const menuSectionItemDe = listingElementDe.query(By.css(".menu-prices-field-wrapper"));

    expect(menuSectionItemDe.nativeElement.childNodes.length).toEqual(1);
    addNewSectionDe.nativeElement.click();
    expect(menuSectionItemDe.nativeElement.childNodes.length).toEqual(2);
    removeNewSectionDe.nativeElement.click();
    expect(menuSectionItemDe.nativeElement.childNodes.length).toEqual(1);
  });

  it("test all labels are correctly set", () => {
    const menuPricesDe = listingElementDe.query(By.css(".title"));
    const sectionTitleDe = listingElementDe.query(By.css(".section-title"));
    const sectionItemsDe = listingElementDe.query(By.css(".section-items"));
    const menuItemTitleDe = listingElementDe.query(By.css(".menu-item-title"));
    const menuItemPriceDe = listingElementDe.query(By.css(".menu-item-price"));
    const menuItemDescriptionDe = listingElementDe.query(By.css(".menu-item-description"));
    const addNewMenuPriceBtnDe = listingElementDe.query(By.css(".add-new-menu-price"));
    const removeNewMenuPriceBtnDe = listingElementDe.query(By.css(".remove-menu-price"));
    const addNewSectionPriceBtnDe = listingElementDe.query(By.css(".add-new-section-menu-price"));
    const removeNewSectionPriceBtnDe = listingElementDe.query(By.css(".remove-section-menu-price"));

    expect(menuPricesDe.nativeElement.textContent).toEqual("Menu Prices");
    expect(sectionTitleDe.nativeElement.textContent).toEqual("Section Title");
    expect(sectionItemsDe.nativeElement.textContent).toEqual("Section Items");
    expect(menuItemTitleDe.nativeElement.textContent).toEqual("Title");
    expect(menuItemPriceDe.nativeElement.textContent).toEqual("Price");
    expect(menuItemDescriptionDe.nativeElement.textContent).toEqual("Description");
    expect(addNewMenuPriceBtnDe.nativeElement.textContent).toEqual("Add New Menu");
    expect(removeNewMenuPriceBtnDe.nativeElement.textContent).toEqual("Remove Menu");
    expect(addNewSectionPriceBtnDe.nativeElement.textContent).toEqual("Add New Section");
    expect(removeNewSectionPriceBtnDe.nativeElement.textContent).toEqual("Remove Section");
  });
});
