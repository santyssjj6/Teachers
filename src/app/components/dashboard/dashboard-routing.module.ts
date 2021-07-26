import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { IndexComponent } from './index/index.component';
import { KardexComponent } from './kardex/kardex.component';
import { ProgrammingComponent } from './programming/programming.component';
import { ScoresComponent } from './scores/scores.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: IndexComponent,
      },
      {
        path: 'programming',
        component: ProgrammingComponent,
      },
      {
        path: 'scores',
        component: ScoresComponent,
      },
      {
        path: 'kardex',
        component: KardexComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
