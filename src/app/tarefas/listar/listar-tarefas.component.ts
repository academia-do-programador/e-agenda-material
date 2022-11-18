import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { map, Observable, shareReplay } from 'rxjs';
import { TarefasService } from '../services/tarefas.service';
import { ListarTarefaViewModel } from '../view-models/listar-tarefa.view-model';

@Component({
  selector: 'app-listar-tarefas',
  templateUrl: './listar-tarefas.component.html',
  styles: [`
    mat-header-cell, mat-cell {
      justify-content: center;
    }
  `]
})
export class ListarTarefasComponent implements OnInit {
  tarefas$: Observable<ListarTarefaViewModel[]>;
  colunasExibidas = ['Título', 'Prioridade', 'Ações'];

  constructor(
    titulo: Title,
    private tarefasService: TarefasService
  ) {
    titulo.setTitle('Tarefas - e-Agenda')
  }

  ngOnInit(): void {
    this.tarefas$ = this.tarefasService.selecionarTodos();
  }

}
