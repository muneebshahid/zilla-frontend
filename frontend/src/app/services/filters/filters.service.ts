import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class FiltersService {
  constructor() {}

  public selectTagInFilter(filterTags: any, selectedtagId) {
    for (let i = 0; i < filterTags.length; i++) {
      if (filterTags[i].id === selectedtagId) {
        filterTags[i].checked = true;
      }
    }
    return filterTags;
  }
  public deSelectTypeInFilter(filterTypes: any, selectedtypeId) {
    for (let i = 0; i < filterTypes.length; i++) {
      if (filterTypes[i].id === selectedtypeId) {
        filterTypes[i].selected = false;
      }
    }
    return filterTypes;
  }
  public deSelectTagFilter(filterTags: any, deselectedTagID) {
    for (let i = 0; i < filterTags.length; i++) {
      if (filterTags[i].id === deselectedTagID) {
        filterTags[i].checked = false;
      }
    }
    return filterTags;
  }

  public getSelectedTagsCSVs(filterTags: any) {
    let tags = [];
    for (let i = 0; i < filterTags.length; i++) {
      if (filterTags[i].checked) {
        tags.push(filterTags[i].id);
      }
    }
    return tags.join();
  }
  public getSelectedTagsObjs(filterTags: any) {
    let tags = [];
    for (let i = 0; i < filterTags.length; i++) {
      if (filterTags[i].checked) {
        tags.push(filterTags[i]);
      }
    }
    return tags;
  }
  public getSelectedTypeID(filterTags: any) {
    for (let i = 0; i < filterTags.length; i++) {
      if (filterTags[i].selected) {
        return filterTags[i].id;
      }
    }
    return null;
  }

  public getSelectedTypeIDObject(filterTags: any) {
    for (let i = 0; i < filterTags.length; i++) {
      if (filterTags[i].selected) {
        return filterTags[i];
      }
    }
    return null;
  }

  public selectTypeInFilter(filterTypes: any, selectedtypeId) {
    for (let i = 0; i < filterTypes.length; i++) {
      if (filterTypes[i].id === selectedtypeId) {
        filterTypes[i].selected = true;
      } else {
        filterTypes[i].selected = false;
      }
    }
    return filterTypes;
  }
}
