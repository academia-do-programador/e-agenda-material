import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification/services/notification.service';
import { ContatoService } from '../services/contato.service';
import { VisualizarContatoViewModel } from '../view-models/visualizar-contato.view-model';

@Component({
  selector: 'app-excluir-contato',
  templateUrl: './excluir-contato.component.html',
  styles: [
    `
      dt { text-align: left; }
      dd { text-align: right; }

    .bg-card {
      background-color: #323259 !important;
    }`
  ]
})
export class ExcluirContatoComponent implements OnInit {

  public contatoFormVM: VisualizarContatoViewModel = new VisualizarContatoViewModel();

  public dataTableObject: any;

  constructor(
    titulo: Title,
    private route: ActivatedRoute,
    private router: Router,
    private contatoService: ContatoService,
    private notificacao: NotificationService
  ) {
    titulo.setTitle('Exclusão de Contato - e-Agenda');
  }

  ngOnInit(): void {
    this.contatoFormVM = this.route.snapshot.data['contato'];
  }

  public gravar() {

    this.contatoService.excluir(this.contatoFormVM.id)
      .subscribe({
        next: (contatoId) => this.processarSucesso(contatoId),
        error: (erro) => this.processarFalha(erro)
      })
  }

  private processarSucesso(tarefaId: string): void {
    this.notificacao.sucesso('Contato excluído com sucesso!');
    this.router.navigate(['/contatos/listar']);
  }

  private processarFalha(erro: any) {
    if (erro) {
      this.notificacao.erro(erro);
    }
  }
}
