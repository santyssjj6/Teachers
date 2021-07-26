import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TeacherLoginService } from 'src/app/services/auth/teacher-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  constructor(
    private _service: TeacherLoginService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      userName: [``, Validators.required],
      password: [``, Validators.required],
    });
  }

  ngOnInit(): void {
    if (localStorage.token) this.fakeLoading();
  }

  login() {
    const { userName, password } = this.form.value;
    this._service.loginTeacher({ userName, password }).subscribe(
      (response) => {
        localStorage.token = response.token;
        this.fakeLoading();
      },
      (error) => {
        if (error.status === 401) {
          this.error();
          this.form.reset();
        }
        console.log('errorzango: ' + error);
      }
    );
  }

  error() {
    this._snackBar.open('C.U. o C.I. incorrectos', 'X', {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['dashboard']);
    }, 500);
  }
}
