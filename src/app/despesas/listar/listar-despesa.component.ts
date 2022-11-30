import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { BaseCardListComponent } from 'src/app/shared/base-card-list/base-card-list.component';
import { DespesaService } from '../services/despesa.service';
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
      case 'Pix': iconeFormaPagamento = 'mobile_friendly'; break;
      case 'Dinheiro': iconeFormaPagamento = 'payments'; break;
      case 'Cartão': iconeFormaPagamento = 'credit_card'; break;
    }

    return iconeFormaPagamento;
  }
}
