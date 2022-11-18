import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompromissoRoutingModule } from './compromisso-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { CompromissoService } from './services/compromisso.service';
import { FormsCompromissoResolver } from './services/forms-compromisso.resolver';
import { VisualizarCompromissoResolver } from './services/visualizar-compromisso.resolver';
import { ListarCompromissoComponent } from './listar/listar-compromisso.component';


@NgModule({
  declarations: [
    ListarCompromissoComponent
  ],
  imports: [
    CommonModule,
    CompromissoRoutingModule,

    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    SharedModule
  ],

  providers: [
    CompromissoService,
    FormsCompromissoResolver,
    VisualizarCompromissoResolver
  ]
})
export class CompromissoModule { }
