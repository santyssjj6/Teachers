import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AvailableSubjectsService } from 'src/app/services/schedules/available-subjects.service';
import { ProgramateService } from 'src/app/services/schedules/programate.service';
import { UpdateScoresService } from 'src/app/services/schedules/update-scores.service';

@Component({
  selector: 'app-programming',
  templateUrl: './programming.component.html',
  styleUrls: ['./programming.component.css'],
})
export class ProgrammingComponent implements OnInit {
  availableSubjects: any[] = [];
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);
  checkBoxes: any[] = [];
  displayedColumns: string[] = [
    'select',
    'MATERIA',
    'SIGLA',
    'GRUPO',
    'CREDITOS',
    'CURSO',
  ];
  constructor(
    private _snackBar: MatSnackBar,
    private _service: AvailableSubjectsService,
    private _programateService: ProgramateService,

    private router: Router
  ) {}

  ngOnInit(): void {
    //CREAR UNA FUNCIÓN QUE OBTENGA AÑO Y GESTIÓN EN CURSO PARA PROGRAMAR MATERIAS
    let token = localStorage.token;
    this._service.getAvailableSubjects(token).subscribe(
      (response) => {
        console.log(response);
        this.availableSubjects = response;
        this.dataSource = new MatTableDataSource(this.availableSubjects);
        this.selection = new SelectionModel(true, this.availableSubjects);
        this.masterToggle();
        //this.dataSource.sort = this.sort;
      },
      (error) => {
        if (error.status === 403) {
          error('Token no enviado');
        }
        if (error.status === 401) {
          error('No autorizado');
        }
        console.log('errorzango: ' + error);
      }
    );
  }

  ngAfterViewInit(): void {
    this.selection = new SelectionModel(true, this.availableSubjects);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  success(message: string) {
    this._snackBar.open(message, 'X', {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['blue-snackbar'],
    });
  }

  programate(): void {
    let data = this.selection.selected;
    let token = localStorage.token;
    this._programateService.programate(token, data).subscribe(
      (response) => {
        this.router.navigate(['dashboard/scores']);
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
    console.log(this.selection.selected);
  }

  change(event: any, row: any) {
    if (event.isUserInput) {
      row.selectedGroup = event.source.value;
    }
  }

  errorMessage(message: string) {
    this._snackBar.open(message, 'X', {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
