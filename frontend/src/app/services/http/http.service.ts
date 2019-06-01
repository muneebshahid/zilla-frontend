import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpParamsOptions } from "@angular/common/http/src/params";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  // private readonly baseUrl = "https://jsonplaceholder.typicode.com";
  private readonly baseUrl = "http://localhost:8000";

  constructor(private httpclient: HttpClient) {}

  post(url: string, params: HttpParamsOptions): Observable<any> {
    return this.httpclient.post(`${this.baseUrl}/${url}`, params);
  }

  get(url: string): Observable<any> {
    return this.httpclient.get(`${this.baseUrl}/${url}`);
  }
}
