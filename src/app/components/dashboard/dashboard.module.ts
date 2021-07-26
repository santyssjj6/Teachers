import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { IndexComponent } from './index/index.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProgrammingComponent } from './programming/programming.component';
import { ScoresComponent } from './scores/scores.component';
import { KardexComponent } from './kardex/kardex.component';

@NgModule({
  declarations: [
    DashboardComponent,
    IndexComponent,
    NavbarComponent,
    ProgrammingComponent,
    ScoresComponent,
    KardexComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
