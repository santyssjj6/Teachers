import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MeService } from 'src/app/services/auth/me.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private _service: MeService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (localStorage.token) {
      let token = localStorage.token;
      this._service.teacherMe(token).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          if (error.status === 403) {
            this.errorMessage('Token no enviado');
          }
          if (error.status === 401) {
            this.errorMessage('No autorizado');
          }
          localStorage.removeItem('token');
          this.router.navigate(['../login']);
          console.log('errorzango: ' + error);
        }
      );
    } else {
      this.router.navigate(['../login']);
    }
  }

  errorMessage(message: string): void {
    this._snackBar.open(message, 'X', {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
