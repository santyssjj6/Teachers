import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from 'src/Globals';

@Injectable({
  providedIn: 'root',
})
export class GroupScoresReportService {
  constructor(private _http: HttpClient) {}
  generateReport(token: string, group_id: any): Observable<any> {
    let request = 'pdfs/createScoresPdf';
    let url = Global.apiUrl + request;
    let data = { group_id };
    let headers = new HttpHeaders().set('x-access-token', token);
    return this._http.post(url, data, { headers });
  }
}
