import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MyKardexService } from 'src/app/services/schedules/my-kardex.service';

@Component({
  selector: 'app-kardex',
  templateUrl: './kardex.component.html',
  styleUrls: ['./kardex.component.css'],
})
export class KardexComponent implements OnInit {
  kardex: any[] = [];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'stage',
    'semester',
    'initials',
    'subject',
    'score',
    'second_instance',
    'status',
    //'actions',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _snackBar: MatSnackBar,
    private _service: MyKardexService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let token = localStorage.token;
    this._service.getMyKardex(token).subscribe(
      (response) => {
        this.kardex = response;
        this.dataSource = new MatTableDataSource(this.kardex);
        //this.dataSource.paginator = this.paginator;
        //this.dataSource.sort = this.sort;
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
  }

  ngAfterViewInit(): void {
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  errorMessage(message: string) {
    this._snackBar.open(message, 'X', {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
