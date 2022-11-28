import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { map, Observable, shareReplay } from 'rxjs';
import { BaseCardListComponent } from 'src/app/shared/base-card-list/base-card-list.component';
import { TarefasService } from '../services/tarefas.service';
import { ListarTarefaViewModel } from '../view-models/listar-tarefa.view-model';

@Component({
  selector: 'app-listar-tarefas',
  templateUrl: './listar-tarefas.component.html'
})
export class ListarTarefasComponent
  extends BaseCardListComponent
  implements OnInit {

  tarefas$: Observable<ListarTarefaViewModel[]>;

  constructor(
    titulo: Title,
    breakpoint: BreakpointObserver,
    private tarefasService: TarefasService
  ) {
    super(breakpoint);
    titulo.setTitle('Tarefas - e-Agenda')
  }

  ngOnInit(): void {
    this.tarefas$ = this.tarefasService.selecionarTodos();
  }

}
