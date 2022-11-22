import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification/services/notification.service';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { CategoriaService } from '../services/categoria.service';
import { FormsCategoriaViewModel } from '../view-models/forms-categoria.view-model';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styles: [
  ]
})
export class EditarCategoriaComponent
  extends BaseFormComponent
  implements OnInit {

  public formCategoria: FormGroup;
  public categoriaFormVM: FormsCategoriaViewModel = new FormsCategoriaViewModel();

  constructor(
    titulo: Title,
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router,
    private notification: NotificationService
  ) {
    super();
    titulo.setTitle('Cadastrar Categoria - e-Agenda');
  }

  ngOnInit(): void {
    this.categoriaFormVM = this.route.snapshot.data['categoria'];

    this.formCategoria = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.formCategoria.patchValue({
      titulo: this.categoriaFormVM.titulo
    });
  }

  get titulo() {
    return this.formCategoria.get('titulo');
  }

  public gravar() {
    if (this.formCategoria.invalid) {
      this.notification.aviso('Por favor, preencha o formulário corretamente.');
      this.exibirMensagensValidacao(this.formCategoria);
      return;
    }

    this.categoriaFormVM = Object.assign({}, this.categoriaFormVM, this.formCategoria.value);

    this.categoriaService.editar(this.categoriaFormVM)
      .subscribe({
        next: (categoriaInserida) => this.processarSucesso(categoriaInserida),
        error: (erro) => this.processarFalha(erro)
      });
  }

  private processarSucesso(categoria: FormsCategoriaViewModel): void {
    this.notification.sucesso(`Categoria "${categoria.titulo}" editada com sucesso!`);
    this.router.navigate(['/categorias/listar']);
  }

  private processarFalha(erro: any) {
    if (erro) {
      this.notification.erro(erro);
    }
  }


}
