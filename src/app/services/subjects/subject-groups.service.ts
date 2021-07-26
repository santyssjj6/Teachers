import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from 'src/Globals';

@Injectable({
  providedIn: 'root',
})
export class SubjectGroupsService {
  constructor(private _http: HttpClient) {}
  getGroups(token: string, subject_id: any): Observable<any> {
    let request = 'subjects/teacherSubjectGroups';
    let url = Global.apiUrl + request;
    let data = { subject_id };
    let headers = new HttpHeaders().set('x-access-token', token);
    return this._http.post(url, data, { headers });
  }
}
