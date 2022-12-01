import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { debounceTime, Observable } from 'rxjs';
import { BaseCardListComponent } from 'src/app/shared/base-card-list/base-card-list.component';
import { CompromissoService } from '../services/compromisso.service';
import { ListarCompromissoViewModel } from '../view-models/listar-compromisso.view-model';

@Component({
  selector: 'app-listar-compromisso',
  templateUrl: './listar-compromisso.component.html'
})
export class ListarCompromissoComponent
  extends BaseCardListComponent
  implements OnInit, AfterViewInit {

  compromissos$: Observable<ListarCompromissoViewModel[]>;
  filtrosCompromissos: string[] = ['Hoje', 'Futuros', 'Passados'];
  periodoFuturo: FormControl = new FormControl(7);

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

  ngAfterViewInit(): void {
    this.periodoFuturo.valueChanges
      .pipe(debounceTime(300))
      .subscribe((periodo) => {
        this.compromissos$ = this.compromissoService.selecionarCompromissosFuturos(periodo)
      });
  }

  trocarFiltro(filtroSelecionado: number) {
    switch (filtroSelecionado) {
      default: this.compromissos$ = this.compromissoService.selecionarCompromissosDeHoje(); break;
      case 1: {
        this.periodoFuturo.setValue(7);
        this.compromissos$ = this.compromissoService.selecionarCompromissosFuturos();
        break
      };
      case 2: this.compromissos$ = this.compromissoService.selecionarCompromissosPassados(); break;
    }
  }

}
