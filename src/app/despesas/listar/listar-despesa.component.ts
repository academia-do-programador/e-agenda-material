import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { map, Observable, shareReplay } from 'rxjs';
import { BaseCardListComponent } from 'src/app/shared/base-card-list/base-card-list.component';
import { DespesaService } from '../services/despesa.service';
import { ListarDespesaViewModel } from '../view-model/listar-despesa.view-model';

@Component({
  selector: 'app-listar-despesa',
  templateUrl: './listar-despesa.component.html',
  styles: [
  ]
})
export class ListarDespesaComponent
  extends BaseCardListComponent
  implements OnInit {
  despesas$: Observable<ListarDespesaViewModel[]>;
  constructor(
    titulo: Title,
    breakpointObserver: BreakpointObserver,
    private despesaService: DespesaService
  ) {
    super(breakpointObserver);
    titulo.setTitle('Despesas - e-Agenda')
  }

  ngOnInit(): void {
    this.despesas$ = this.despesaService.selecionarTodos();
  }
}
