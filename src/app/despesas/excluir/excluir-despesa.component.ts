import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification/services/notification.service';
import { DespesaService } from '../services/despesa.service';
import { VisualizarDespesaViewModel } from '../view-model/visualizar-despesa.view-model';

@Component({
  selector: 'app-excluir-despesa',
  templateUrl: './excluir-despesa.component.html',
  styles: [
    `
      dt { text-align: left; }
      dd { text-align: right; }

    .bg-card {
      background-color: #323259 !important;
    }`
  ]
})
export class ExcluirDespesaComponent implements OnInit {

  public despesaFormVM: VisualizarDespesaViewModel = new VisualizarDespesaViewModel();

  constructor(
    titulo: Title,
    private route: ActivatedRoute,
    private router: Router,
    private despesasService: DespesaService,
    private notificacao: NotificationService
  ) {
    titulo.setTitle('Excluir Despesa - e-Agenda');
  }

  ngOnInit(): void {
    this.despesaFormVM = this.route.snapshot.data['despesa'];
  }

  public gravar() {
    this.despesasService.excluir(this.despesaFormVM.id)
      .subscribe({
        next: () => this.processarSucesso(),
        error: (erro: any) => this.processarFalha(erro)
      });
  }

  private processarSucesso(): void {
    this.notificacao.sucesso(`Despesa "${this.despesaFormVM.descricao}" excluída com sucesso!`);
    this.router.navigate(['/despesas/listar']);
  }

  private processarFalha(erro: any) {
    if (erro) {
      this.notificacao.erro(erro);
    }
  }

}
