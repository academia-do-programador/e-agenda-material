import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { Title } from '@angular/platform-browser';
import { map, Observable, shareReplay } from 'rxjs';
import { NotificationService } from 'src/app/notification/services/notification.service';
import { BaseCardListComponent } from 'src/app/shared/base-card-list/base-card-list.component';
import { ContatoService } from '../services/contato.service';
import { FormsContatoViewModel } from '../view-models/forms-contato.view-model';
import { ListarContatoViewModel } from '../view-models/listar-contato.view-model';

@Component({
  selector: 'app-listar-contato',
  templateUrl: './listar-contato.component.html'
})
export class ListarContatoComponent
  extends BaseCardListComponent
  implements OnInit {

  contatos$: Observable<ListarContatoViewModel[]>;
  filtrosContatos: string[] = ['Não-Favoritos', 'Favoritos'];

  constructor(
    titulo: Title,
    breakpoint: BreakpointObserver,
    private notification: NotificationService,
    private contatoService: ContatoService
  ) {
    super(breakpoint);
    titulo.setTitle('Contatos - e-Agenda')
  }

  ngOnInit(): void {
    this.contatos$ = this.contatoService.selecionarContatosNaoFavoritos();
  }

  trocarFiltro(filtroSelecionado: number) {
    switch (filtroSelecionado) {
      default: this.contatos$ = this.contatoService.selecionarContatosNaoFavoritos(); break;
      case 1: this.contatos$ = this.contatoService.selecionarContatosFavoritos(); break;
    }
  }

  ativarStatusFavorito(contato: ListarContatoViewModel) {
    contato.favorito = !contato.favorito;

    this.contatoService.ativarStatusFavorito(contato.id)
      .subscribe({
        next: (contatoSelecionado: FormsContatoViewModel) => this.processarSucesso(contatoSelecionado),
        error: (erro: any) => this.processarFalha(erro)
      });
  }

  private processarSucesso(contato: FormsContatoViewModel) {
    if (contato.favorito) {
      this.contatos$ = this.contatoService.selecionarContatosNaoFavoritos();
      return this.notification.sucesso(`Contato '${contato.nome}' adicionado aos favoritos com sucesso!`);
    }

    this.notification.sucesso(`Contato '${contato.nome}' removido dos favoritos com sucesso!`);
    this.contatos$ = this.contatoService.selecionarContatosFavoritos();
  }

  private processarFalha(erro: any) {
    if (erro) {
      this.notification.erro(erro);
    }
  }
}
