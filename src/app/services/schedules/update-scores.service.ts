import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from 'src/Globals';

@Injectable({
  providedIn: 'root',
})
export class UpdateScoresService {
  constructor(private _http: HttpClient) {}
  updateScores(token: string, data: any): Observable<any> {
    let request = 'schedules/updateScores';
    let url = Global.apiUrl + request;
    let headers = new HttpHeaders().set('x-access-token', token);
    return this._http.post(url, data, { headers });
  }
}
