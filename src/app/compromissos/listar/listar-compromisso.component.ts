import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { BaseCardListComponent } from 'src/app/shared/base-card-list/base-card-list.component';
import { CompromissoService } from '../services/compromisso.service';
import { ListarCompromissoViewModel } from '../view-models/listar-compromisso.view-model';

@Component({
  selector: 'app-listar-compromisso',
  templateUrl: './listar-compromisso.component.html'
})
export class ListarCompromissoComponent
  extends BaseCardListComponent
  implements OnInit {

  compromissos$: Observable<ListarCompromissoViewModel[]>;
  filtrosCompromissos: string[] = ['Hoje', 'Futuros', 'Passados'];

  constructor(
    titulo: Title,
    breakpoint: BreakpointObserver,
    private compromissoService: CompromissoService,
  ) {
    super(breakpoint);
    titulo.setTitle('Compromissos - e-Agenda')
  }

  ngOnInit(): void {
    this.compromissos$ = this.compromissoService.selecionarCompromissosDeHoje();
  }

  trocarFiltro(filtroSelecionado: number) {
    switch (filtroSelecionado) {
      default: this.compromissos$ = this.compromissoService.selecionarCompromissosDeHoje(); break;
      case 1: this.compromissos$ = this.compromissoService.selecionarCompromissosFuturos(); break;
      case 2: this.compromissos$ = this.compromissoService.selecionarCompromissosPassados(); break;
    }
  }

}
