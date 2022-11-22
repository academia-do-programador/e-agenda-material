import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { map, Observable } from 'rxjs';
import { DespesaService } from '../services/despesa.service';
import { ListarDespesaViewModel } from '../view-model/listar-despesa.view-model';

@Component({
  selector: 'app-listar-despesa',
  templateUrl: './listar-despesa.component.html',
  styles: [
  ]
})
export class ListarDespesaComponent implements OnInit {
  despesas$: Observable<ListarDespesaViewModel[]>;

  constructor(
    titulo: Title,
    private despesaService: DespesaService
  ) {
    titulo.setTitle('Despesas - e-Agenda')
  }

  ngOnInit(): void {
    this.despesas$ = this.despesaService.selecionarTodos();
  }

}
