import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  private readonly baseUrl = "https://jsonplaceholder.typicode.com";

  constructor(private httpclient: HttpClient) {}

  getPosts() {
    return this.httpclient.get(this.baseUrl + "/posts");
  }
}
