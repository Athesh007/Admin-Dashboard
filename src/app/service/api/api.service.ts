import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url: string =
    'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';

  constructor(private http: HttpClient) {}

  getdata() {
    return this.http.get(this.url);
  }
}
