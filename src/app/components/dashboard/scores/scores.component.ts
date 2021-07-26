import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GroupScoresReportService } from 'src/app/services/schedules/group-scores-report.service';
import { GroupScoresService } from 'src/app/services/schedules/group-scores.service';
import { UpdateScoresService } from 'src/app/services/schedules/update-scores.service';
import { SubjectGroupsService } from 'src/app/services/subjects/subject-groups.service';
import { SubjectService } from 'src/app/services/subjects/subject.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css'],
})
export class ScoresComponent implements OnInit {
  form: FormGroup;
  group_id: any;
  programation: any[] = [];
  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = [
    'cu',
    'student',
    'initials',
    'score',
    'second_instance',
  ];
  subjects: any[] = [];
  groups: any[] = [];
  groupScores: any[] = [];

  constructor(
    private fb: FormBuilder,
    private _service: SubjectService,
    private _groupService: SubjectGroupsService,
    private _groupScoreService: GroupScoresService,
    private _groupScoresReportService: GroupScoresReportService,
    private _updateScoresService: UpdateScoresService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      subject: [``, Validators.required],
      group: [``, Validators.required],
    });
  }

  ngOnInit(): void {
    let token = localStorage.token;
    this._service.getSubjects(token).subscribe(
      (response) => {
        console.log(response);
        this.subjects = response.subjects;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSubjectSelected(value: string) {
    let token = localStorage.token;
    this._groupService.getGroups(token, value).subscribe(
      (response) => {
        this.groups = response.groups;
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

  onGroupSelected(value: string) {
    let token = localStorage.token;
    this.group_id = value;
    this._groupScoreService.getGroupScores(token, value).subscribe(
      (response) => {
        console.log(response);
        this.groupScores = response;
        this.dataSource = new MatTableDataSource(this.groupScores);
        this.selection = new SelectionModel(true, this.groupScores);
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

  errorMessage(message: string): void {
    this._snackBar.open(message, 'X', {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  change(event: any, row: any) {
    row.score = event.srcElement.value;
  }

  changeSecondInstance(event: any, row: any) {
    row.second_instance = event.srcElement.value;
  }

  success(message: string) {
    this._snackBar.open(message, '', {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['blue-snackbar'],
    });
  }

  save(): void {
    let token = localStorage.token;
    let found = this.selection.selected.find(
      (row) => (row.score >= 51 || row.score == 0) && row.second_instance > 0
    );

    let data = this.selection.selected;
    this._updateScoresService.updateScores(token, data).subscribe(
      (response) => {
        console.log(this.selection.selected);
        if (found)
          this.errorMessage(
            'Las notas introducidas en segunda instanca habiendose aprobado o abandonado la materia serán ignoradas'
          );
        else this.success('Notas Registradas Exitosamente');
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

  downloadPDF(): void {
    let token = localStorage.token;
    let data = this.group_id;
    this._groupScoresReportService.generateReport(token, data).subscribe(
      (response) => {
        this.success('El PDF se descargará en breve');
        window.location.href = 'http://localhost:4000/pdfs/downloadScoresPdf';
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
}
