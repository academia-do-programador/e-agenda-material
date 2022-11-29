import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContatoService } from './services/contato.service';
import { FormsContatoResolver } from './services/forms-contato.resolver';
import { VisualizarContatoResolver } from './services/visualizar-contato.resolver';
import { ContatoRoutingModule } from './contato-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { SharedModule } from '../shared/shared.module';
import { ListarContatoComponent } from './listar/listar-contato.component';
import { InserirContatoComponent } from './inserir/inserir-contato.component';
import { EditarContatoComponent } from './editar/editar-contato.component';
import { ExcluirContatoComponent } from './excluir/excluir-contato.component';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [
    ListarContatoComponent,
    InserirContatoComponent,
    EditarContatoComponent,
    ExcluirContatoComponent
  ],
  imports: [
    CommonModule,
    ContatoRoutingModule,
    NgxMaskModule.forRoot(),

    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    SharedModule
  ],

  providers: [ContatoService, FormsContatoResolver, VisualizarContatoResolver]
})
export class ContatoModule { }
