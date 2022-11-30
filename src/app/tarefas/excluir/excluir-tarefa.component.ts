import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { TarefasService } from '../services/tarefas.service';
import { VisualizarTarefaViewModel } from '../view-models/visualizar-tarefa.view-model';

@Component({
  selector: 'app-excluir-tarefa',
  templateUrl: './excluir-tarefa.component.html',
  styles: [
    `
      dt { text-align: left; }
      dd { text-align: right; }

    .bg-card {
      background-color: #323259 !important;
    }`
  ]
})
export class ExcluirTarefaComponent implements OnInit {

  public tarefaFormVM: VisualizarTarefaViewModel = new VisualizarTarefaViewModel();

  constructor(
    titulo: Title,
    private route: ActivatedRoute,
    private router: Router,
    private tarefasService: TarefasService,
    private notificacao: NotificationService
  ) {
    titulo.setTitle('Exclusão de Tarefa - e-Agenda');
  }

  ngOnInit(): void {
    this.tarefaFormVM = this.route.snapshot.data['tarefa'];
  }

  public gravar() {
    this.tarefasService.excluir(this.tarefaFormVM.id)
      .subscribe({
        next: () => this.processarSucesso(),
        error: (erro) => this.processarFalha(erro)
      })
  }

  private processarSucesso(): void {
    this.notificacao.sucesso(`Tarefa "${this.tarefaFormVM.titulo}" excluída com sucesso!`);
    this.router.navigate(['/tarefas/listar']);
  }

  private processarFalha(erro: any) {
    if (erro) {
      this.notificacao.erro(erro);
    }
  }
}
