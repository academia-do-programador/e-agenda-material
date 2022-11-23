import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';
import { BaseCardListComponent } from 'src/app/shared/base-card-list/base-card-list.component';
import { PrioridadeTarefaEnum } from 'src/app/tarefas/view-models/prioridade-tarefa.enum';
import { DespesaService } from '../services/despesa.service';
import { FormaPgtoDespesaEnum } from '../view-model/forma-pgto-despesa.enum';
import { ListarDespesaViewModel } from '../view-model/listar-despesa.view-model';

@Component({
  selector: 'app-listar-despesa',
  templateUrl: './listar-despesa.component.html'
})
export class ListarDespesaComponent
  extends BaseCardListComponent
  implements OnInit {

  despesas$: Observable<ListarDespesaViewModel[]>;
  constructor(
    titulo: Title,
    breakpoint: BreakpointObserver,
    private router: Router,
    private despesaService: DespesaService
  ) {
    super(breakpoint);
    titulo.setTitle('Despesas - e-Agenda');
  }

  ngOnInit(): void {
    this.despesas$ = this.despesaService.selecionarTodos();
  }

  public gerarIconeFormaPagamento(formaPagamento?: string): string {
    let iconeFormaPagamento: 'mobile_friendly' | 'payments' | 'credit_card' | '' = '';

    switch (formaPagamento) {
      case 'PIX': iconeFormaPagamento = 'mobile_friendly'; break;
      case 'Dinheiro': iconeFormaPagamento = 'payments'; break;
      case 'Cartão de Crédito': iconeFormaPagamento = 'credit_card'; break;
    }

    return iconeFormaPagamento;
  }

  public editar(despesa: ListarDespesaViewModel) {
    this.router.navigate(['/despesas/editar', despesa.id]);
  }
}
