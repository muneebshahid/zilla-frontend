import { async, ComponentFixture, TestBed, tick } from "@angular/core/testing";

import { AddMenuComponent } from "./add-menu.component";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
declare var jQuery: any;
describe("AddMenuComponent", () => {
  let component: AddMenuComponent;
  let fixture: ComponentFixture<AddMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddMenuComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("add new menu link should add a new menu", () => {
    const listingElementDe: DebugElement = fixture.debugElement;
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
    const listingElementDe: DebugElement = fixture.debugElement;
    const addNewSectionDe = listingElementDe.query(By.css(".add-new-section-menu-price"));
    const removeNewSectionDe = listingElementDe.query(By.css(".remove-section-menu-price"));
    const menuSectionItemDe = listingElementDe.query(By.css(".menu-prices-field-wrapper"));

    expect(menuSectionItemDe.nativeElement.childNodes.length).toEqual(1);
    addNewSectionDe.nativeElement.click();
    expect(menuSectionItemDe.nativeElement.childNodes.length).toEqual(2);
    removeNewSectionDe.nativeElement.click();
    expect(menuSectionItemDe.nativeElement.childNodes.length).toEqual(1);
  });
});
