import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';
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
  filtrosContatos: string[] = ['Comuns', 'Favoritos'];

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
    this.contatos$ = this.contatoService.selecionarContatosComuns();
  }

  trocarFiltro(filtroSelecionado: number) {
    switch (filtroSelecionado) {
      default: this.contatos$ = this.contatoService.selecionarContatosComuns(); break;
      case 1: this.contatos$ = this.contatoService.selecionarContatosFavoritos(); break;
    }
  }

  ativarStatusFavorito(contatoId: string) {
    this.contatoService.ativarStatusFavorito(contatoId)
      .subscribe({
        next: (contatoSelecionado: FormsContatoViewModel) => this.processarSucesso(contatoSelecionado),
        error: (erro: any) => this.processarFalha(erro)
      });
  }

  exibirStatusFavorito(status: boolean) {
    return status ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos';
  }

  exibirIconeFavorito(status: boolean) {
    return status ? 'bookmark_remove' : 'bookmark_add';
  }

  private processarSucesso(contato: FormsContatoViewModel) {
    if (contato.favorito) {
      this.contatos$ = this.contatoService.selecionarContatosComuns();
      return this.notification.sucesso(`Contato '${contato.nome}' adicionado aos favoritos com sucesso!`);
    }

    this.contatos$ = this.contatoService.selecionarContatosFavoritos();
    this.notification.sucesso(`Contato '${contato.nome}' removido dos favoritos com sucesso!`);
  }

  private processarFalha(erro: any) {
    if (erro) {
      this.notification.erro(erro);
    }
  }
}
