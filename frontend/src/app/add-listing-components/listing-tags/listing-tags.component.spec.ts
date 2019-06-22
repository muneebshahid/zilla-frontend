import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingTagsComponent } from './listing-tags.component';

describe('ListingTagsComponent', () => {
  let component: ListingTagsComponent;
  let fixture: ComponentFixture<ListingTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
