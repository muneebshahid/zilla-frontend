import {
  DetailHeaderGalleryComponent,
  DetailHeaderComponent,
  BusinessDetailContainerComponent
} from "./../../testing/dummy_components";
import { async, ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";

import { HomeDetailDrawerComponent } from "./home-detail-drawer.component";
import { StoreModule, Store } from "@ngrx/store";
import { appReducers } from "src/app/store/reducers/app.reducer";
import { ElementRef } from "@angular/core";
import { By } from "@angular/platform-browser";
import { IAppState } from "src/app/store/state/app.state";
import { UpdateCloseDetailDrawer } from "src/app/store/actions/general";
import { MockElementRef } from "src/app/testing/dummy_spies";

declare var jQuery: any;

describe("HomeDetailDrawerComponent", () => {
  let component: HomeDetailDrawerComponent;
  let fixture: ComponentFixture<HomeDetailDrawerComponent>;
  let store: Store<IAppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeDetailDrawerComponent,
        DetailHeaderGalleryComponent,
        DetailHeaderComponent,
        BusinessDetailContainerComponent
      ],
      providers: [{ provide: ElementRef, useValue: MockElementRef }],
      imports: [StoreModule.forRoot(appReducers)]
    }).compileComponents();

    store = TestBed.get(Store);
    spyOn(store, "dispatch").and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDetailDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should not close drawer and update lastState since magnific popup was open", () => {
    jQuery("body").addClass("dummy-class");
    let detailContainerElement = fixture.debugElement.queryAll(By.css(".listings-detail-wrapper"));
    let detailContainerElementNative: HTMLElement = detailContainerElement[0].nativeElement;
    detailContainerElementNative.click();
    expect(component.lastState).toBe("pop up was not open");
  });
  it("should close popup but not drawer and update lastState", () => {
    jQuery("body").addClass("mfp-zoom-out-cur");
    let detailContainerElement = fixture.debugElement.queryAll(By.css(".listings-detail-wrapper"));
    let detailContainerElementNative: HTMLElement = detailContainerElement[0].nativeElement;
    detailContainerElementNative.click();
    expect(component.lastState).toBe("popup was open");
  });
  it("should close drawer and update lastState", fakeAsync(() => {
    jQuery("body").addClass("mfp-zoom-out-cur");
    jQuery("body").click();
    tick(1000);
    let closeDrawerAction = new UpdateCloseDetailDrawer(true);
    expect(store.dispatch).toHaveBeenCalledWith(closeDrawerAction);
  }));
  it("should set the lastState as the popup was not open", () => {
    component.lastState = "popup was open";
    jQuery("body").addClass("mfp-zoom-out-cur");
    jQuery("body").click();

    expect(component.lastState).toBe("pop up was not open");
  });
});
