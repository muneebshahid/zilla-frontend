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

  it("add new menu link should add a new menu item", () => {
    const listingElementDe: DebugElement = fixture.debugElement;
    const addNewMenuDe = listingElementDe.query(By.css(".add-new-menu-price"));
    const menuItemDe = listingElementDe.query(By.css(".menu-prices-section-item-wrapper"));

    expect(menuItemDe.childNodes.length).toEqual(1);
    jQuery(addNewMenuDe.nativeElement).trigger("click");

    const menuItemDe2 = listingElementDe.query(By.css(".menu-prices-section-item-wrapper"));
    expect(menuItemDe2.childNodes.length).toEqual(2);
  });
  it("add new section link should add a new menu item", () => {});
  it("remove new menu link should add a new menu item", () => {});
  it("remove new section link should add a new menu item", () => {});
});
