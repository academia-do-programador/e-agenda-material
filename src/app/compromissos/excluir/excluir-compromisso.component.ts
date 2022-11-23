import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification/services/notification.service';
import { CompromissoService } from '../services/compromisso.service';
import { VisualizarCompromissoViewModel } from '../view-models/visualizar-compromisso.view-model';

@Component({
  selector: 'app-excluir-compromisso',
  templateUrl: './excluir-compromisso.component.html',
  styles: [
    `
  `
  ]
})
export class ExcluirCompromissoComponent implements OnInit {

  public compromissoFormVM: VisualizarCompromissoViewModel = new VisualizarCompromissoViewModel();

  constructor(
    titulo: Title,
    private route: ActivatedRoute,
    private router: Router,
    private compromissoService: CompromissoService,
    private notificacao: NotificationService
  ) {
    titulo.setTitle('Exclusão de Compromisso - e-Agenda');
  }

  ngOnInit(): void {
    this.compromissoFormVM = this.route.snapshot.data['compromisso'];
  }

  public gravar() {

    this.compromissoService.excluir(this.compromissoFormVM.id)
      .subscribe({
        next: (compromissoId) => this.processarSucesso(),
        error: (erro) => this.processarFalha(erro)
      })
  }

  private processarSucesso(): void {
    this.notificacao.sucesso(`Compromisso "${this.compromissoFormVM.assunto}" excluído com sucesso!`);
    this.router.navigate(['/compromissos/listar']);
  }

  private processarFalha(erro: any) {
    if (erro) {
      this.notificacao.erro(erro);
    }
  }

}
