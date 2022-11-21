import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification/services/notification.service';
import { CategoriaService } from '../services/categoria.service';
import { VisualizarCategoriaViewModel } from '../view-models/visualizar-categoria.view-model';

@Component({
  selector: 'app-excluir-categoria',
  templateUrl: './excluir-categoria.component.html',
  styles: [
    `
      dt { text-align: left; }
      dd { text-align: right; }

    .bg-card {
      background-color: #323259 !important;
    }`
  ]
})
export class ExcluirCategoriaComponent implements OnInit {

  public categoriaFormVM: VisualizarCategoriaViewModel = new VisualizarCategoriaViewModel();

  constructor(
    titulo: Title,
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService,
    private notificacao: NotificationService
  ) {
    titulo.setTitle('Excluir Contato - e-Agenda');
  }

  ngOnInit(): void {
    this.categoriaFormVM = this.route.snapshot.data['categoria'];
  }

  public gravar() {

    this.categoriaService.excluir(this.categoriaFormVM.id)
      .subscribe({
        next: () => this.processarSucesso(),
        error: (erro) => this.processarFalha(erro)
      })
  }

  private processarSucesso(): void {
    this.notificacao.sucesso(`Categoria "${this.categoriaFormVM.titulo}" excluída com sucesso!`);
    this.router.navigate(['/categorias/listar']);
  }

  private processarFalha(erro: any) {
    if (erro) {
      this.notificacao.erro(erro);
    }
  }
}
