import { TestBed } from "@angular/core/testing";

import { FiltersService } from "./filters.service";

describe("FiltersService", () => {
  let filterTags;
  let filterTypes;
  let filterTypesAllFalse;
  let filterTagsAllFalse;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    filterTags = [
      {
        id: 11,
        checked: true,
        tag: "halal"
      },
      {
        id: 12,
        checked: false,
        tag: "vegan"
      },
      {
        id: 13,
        checked: true,
        tag: "vegan2"
      }
    ];
    filterTypes = [
      {
        id: 11,
        selected: true,
        tag: "halal"
      },
      {
        id: 12,
        selected: false,
        tag: "vegan"
      },
      {
        id: 13,
        selected: true,
        tag: "vegan2"
      }
    ];
    filterTypesAllFalse = [
      {
        id: 11,
        selected: false,
        tag: "halal"
      },
      {
        id: 12,
        selected: false,
        tag: "halal2"
      }
    ];
    filterTagsAllFalse = [
      {
        id: 11,
        checked: false,
        tag: "halal"
      },
      {
        id: 12,
        checked: false,
        tag: "halal2"
      }
    ];
  });

  it("should be created", () => {
    const service: FiltersService = TestBed.get(FiltersService);
    expect(service).toBeTruthy();
  });

  it("should selectTagInFilter", () => {
    const service: FiltersService = TestBed.get(FiltersService);
    const updatedFilterTags = service.selectTagInFilter(filterTags, 12);
    expect(updatedFilterTags[1].checked).toBe(true);
  });

  it("should deSelectTagFilter", () => {
    const service: FiltersService = TestBed.get(FiltersService);
    const updatedFilterTags = service.deSelectTagFilter(filterTags, 11);
    expect(updatedFilterTags[0].checked).toBe(false);
  });

  it("should deSelectTypeInFilter", () => {
    const service: FiltersService = TestBed.get(FiltersService);
    const updatedFilterTypes = service.deSelectTypeInFilter(filterTypes, 11);
    expect(updatedFilterTypes[0].selected).toBe(false);
  });

  it("should getSelectedTagsCSVs", () => {
    const service: FiltersService = TestBed.get(FiltersService);
    const csvIDs = service.getSelectedTagsCSVs(filterTags);
    expect(csvIDs).toEqual("11,13");
  });

  it("should getSelectedTagsObjs", () => {
    const service: FiltersService = TestBed.get(FiltersService);
    const tagsObjs = service.getSelectedTagsObjs(filterTags);
    expect(tagsObjs[0].checked).toEqual(true);
    expect(tagsObjs[1].checked).toEqual(true);
  });

  it("should getSelectedTypeID", () => {
    const service: FiltersService = TestBed.get(FiltersService);
    const type = service.getSelectedTypeID(filterTypes);
    const typeNull = service.getSelectedTypeID(filterTypesAllFalse);
    expect(type).toEqual(11);
    expect(typeNull).toBeNull();
  });
  it("should getSelectedTypeIDObject", () => {
    const service: FiltersService = TestBed.get(FiltersService);
    const type = service.getSelectedTypeIDObject(filterTypes);
    const typeNull = service.getSelectedTypeIDObject(filterTypesAllFalse);
    expect(type.id).toEqual(11);
    expect(typeNull).toBeNull();
  });
  it("should selectTypeInFilter", () => {
    const service: FiltersService = TestBed.get(FiltersService);
    const filterTypess = service.selectTypeInFilter(filterTypesAllFalse, 11);
    expect(filterTypess[0].selected).toBe(true);
    expect(filterTypess[1].selected).toBe(false);
  });
  it("should typeFilterSelected", () => {
    const service: FiltersService = TestBed.get(FiltersService);
    const filterTypesIsNotSelected = service.typeFilterSelected(filterTypesAllFalse);
    const filterTypesIsSelected = service.typeFilterSelected(filterTypes);
    expect(filterTypesIsSelected).toBe(true);
    expect(filterTypesIsNotSelected).toBe(false);
  });
  it("should tagFilterSelected", () => {
    const service: FiltersService = TestBed.get(FiltersService);
    const filterTypesIsNotSelected = service.tagFilterSelected(filterTagsAllFalse);
    const filterTypesIsSelected = service.tagFilterSelected(filterTags);
    expect(filterTypesIsSelected).toBe(true);
    expect(filterTypesIsNotSelected).toBe(false);
  });
});
