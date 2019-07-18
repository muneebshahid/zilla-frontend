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
  public deselectTagInFilter(filterTags: any, selectedtagId) {
    for (let i = 0; i < filterTags.length; i++) {
      if (filterTags[i].id === selectedtagId) {
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
  public getSelectedTypeID(filterTags: any) {
    for (let i = 0; i < filterTags.length; i++) {
      if (filterTags[i].selected) {
        return filterTags[i].id;
      }
    }
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