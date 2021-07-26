import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from 'src/Globals';

@Injectable({
  providedIn: 'root',
})
export class TeacherLoginService {
  constructor(private _http: HttpClient) {}
  loginTeacher(data: any): Observable<any> {
    let request = 'auth/teacherLogin';
    let url = Global.apiUrl + request;
    return this._http.post(url, data);
  }
}
