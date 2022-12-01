import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { DashboardModule } from '../dashboard/dashboard.module';
import { SharedModule } from '../shared/shared.module';
import { ShellUserInfoComponent } from './shell-user-info/shell-user-info.component';
import { ShellComponent } from './shell.component';
@NgModule({
  declarations: [ShellComponent, ShellUserInfoComponent],
  exports: [ShellComponent, ShellUserInfoComponent],
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatExpansionModule,
    RouterModule,
    DashboardModule,
    SharedModule
  ]
})
export class ShellModule { }
