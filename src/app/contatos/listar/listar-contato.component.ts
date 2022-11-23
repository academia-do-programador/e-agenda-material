import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { map, Observable, shareReplay } from 'rxjs';
import { BaseCardListComponent } from 'src/app/shared/base-card-list/base-card-list.component';
import { ContatoService } from '../services/contato.service';
import { ListarContatoViewModel } from '../view-models/listar-contato.view-model';

@Component({
  selector: 'app-listar-contato',
  templateUrl: './listar-contato.component.html'
})
export class ListarContatoComponent
  extends BaseCardListComponent
  implements OnInit {
  contatos$: Observable<ListarContatoViewModel[]>;
  colunasExibidas = ['Nome', 'Telefone', 'Cargo', 'Ações'];

  constructor(
    titulo: Title,
    breakpoint: BreakpointObserver,
    private contatoService: ContatoService
  ) {
    super(breakpoint);
    titulo.setTitle('Contatos - e-Agenda')
  }

  ngOnInit(): void {
    this.contatos$ = this.contatoService.selecionarTodos();
  }

}
