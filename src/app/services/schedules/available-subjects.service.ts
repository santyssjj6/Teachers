import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from 'src/Globals';

@Injectable({
  providedIn: 'root',
})
export class AvailableSubjectsService {
  constructor(private _http: HttpClient) {}
  getAvailableSubjects(token: string): Observable<any> {
    let request = 'schedules/availableSubjects';
    let url = Global.apiUrl + request;
    let headers = new HttpHeaders().set('x-access-token', token);
    return this._http.post(url, {}, { headers });
  }
}
