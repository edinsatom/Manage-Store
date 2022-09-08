import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { RequestModel } from '../models/request.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
  ) { }


  post$(request:RequestModel<any | any[]>){
    this.http.post(request.url, request.body)
      .pipe(
        map((resp: any | any[]) => resp)
      );
  }
}
