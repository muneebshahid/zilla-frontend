import { businessMenuDummy, productsObj } from "./../../testing/models";
import { async, ComponentFixture, TestBed, tick, fakeAsync } from "@angular/core/testing";

import { BusinessDetailMenuComponent } from "./business-detail-menu.component";
import { businessObj } from "src/app/testing/models";
import { By } from "@angular/platform-browser";

describe("BusinessDetailMenuComponent", () => {
  let component: BusinessDetailMenuComponent;
  let fixture: ComponentFixture<BusinessDetailMenuComponent>;
  let products;
  let businessMenus;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessDetailMenuComponent]
    }).compileComponents();

    products = businessObj;
    businessMenus = businessMenuDummy;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDetailMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should do nothing ", () => {
    component.products = null;
    const menuItemsAdded = fixture.debugElement.queryAll(By.css(".panel.panel-default")).length;
    expect(menuItemsAdded).toBe(0);
  });
  it("should set show menu in products ", () => {
    component.products = productsObj;
    component.ngOnChanges({});
    fixture.detectChanges();
    const menuItemsAdded = fixture.debugElement.queryAll(By.css(".panel.panel-default")).length;
    const informationBlock: HTMLElement = fixture.debugElement.query(By.css("div.information"))
      .nativeElement;
    const descriptionBlock: HTMLElement = fixture.debugElement.query(By.css("div.description"))
      .nativeElement;
    const titleBlock: HTMLElement = fixture.debugElement.query(By.css("h5")).nativeElement;

    expect(informationBlock.innerHTML).toContain("$25");
    expect(descriptionBlock.innerHTML).toContain("dummy description".trim());
    expect(titleBlock.innerHTML).toContain("dummy title".trim());
    expect(menuItemsAdded).toBe(1);
  });

  it("should open close the drop down menu and set chevron accordingly ", fakeAsync(() => {
    component.products = productsObj;
    component.ngOnChanges({});
    fixture.detectChanges();

    const collapseBtn: HTMLElement = fixture.debugElement.query(By.css(".collapsed.collapse-btn0"))
      .nativeElement;
    const collapseDetails: HTMLElement = fixture.debugElement.query(By.css("#collapse-detail0"))
      .nativeElement;

    expect(collapseDetails.classList).not.toContain("in");
    expect(component.businessMenus[0].collapsed).toBeTruthy();

    collapseBtn.click();
    tick(1000);

    expect(collapseDetails.classList).toContain("in");
    expect(component.businessMenus[0].collapsed).toBeFalsy();
  }));
});
