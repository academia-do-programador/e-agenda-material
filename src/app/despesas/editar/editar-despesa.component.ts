import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoriaService } from 'src/app/categorias/services/categoria.service';
import { ListarCategoriaViewModel } from 'src/app/categorias/view-models/listar-categoria.view-model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { DespesaService } from '../services/despesa.service';
import { FormaPgtoDespesaEnum } from '../view-model/forma-pgto-despesa.enum';
import { FormsDespesaViewModel } from '../view-model/forms-despesa.view-model';

@Component({
  selector: 'app-editar-despesa',
  templateUrl: './editar-despesa.component.html'
})
export class EditarDespesaComponent
  extends BaseFormComponent
  implements OnInit {

  public formDespesa: FormGroup;
  public despesaFormVM: FormsDespesaViewModel = new FormsDespesaViewModel();

  public categorias$: Observable<ListarCategoriaViewModel[]>;

  public formasPagamento = Object.values(FormaPgtoDespesaEnum)
    .filter(v => !Number.isFinite(v));

  constructor(
    titulo: Title,
    private formBuilder: FormBuilder,
    private despesaService: DespesaService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router,
    private notification: NotificationService
  ) {
    super();
    titulo.setTitle('Edição de Despesa - e-Agenda');
  }

  ngOnInit(): void {
    this.despesaFormVM = this.route.snapshot.data['despesa'];

    this.formDespesa = this.formBuilder.group({
      descricao: ['', [Validators.required, Validators.minLength(3)]],
      valor: [0.0, [Validators.required, Validators.min(0.1)]],
      data: [new Date().toISOString().substring(0, 10), [Validators.required]],
      formaPagamento: [0, [Validators.required]],
      categoriasSelecionadas: [[], [Validators.required]],
    });

    this.formDespesa.patchValue({
      descricao: this.despesaFormVM.descricao,
      valor: this.despesaFormVM.valor,
      data: this.despesaFormVM.data.toString().substring(0, 10),
      formaPagamento: this.despesaFormVM.formaPagamento,
      categoriasSelecionadas: this.despesaFormVM.categoriasSelecionadas,
    });

    this.categorias$ = this.categoriaService.selecionarTodos();
  }

  get descricao() {
    return this.formDespesa.get('descricao');
  }

  get valor() {
    return this.formDespesa.get('valor');
  }

  get data() {
    return this.formDespesa.get('data');
  }

  get formaPagamento() {
    return this.formDespesa.get('formaPagamento');
  }

  get categoriasSelecionadas() {
    return this.formDespesa.get('categoriasSelecionadas');
  }

  public gravar() {
    if (this.formDespesa.invalid) {
      this.notification.aviso('Por favor, preencha o formulário corretamente.');
      this.exibirMensagensValidacao(this.formDespesa);
      return;
    }

    this.despesaFormVM = this.mapearFormularioParaViewModel(this.formDespesa, this.despesaFormVM);

    this.despesaService.editar(this.despesaFormVM)
      .subscribe({
        next: (despesaInserida) => this.processarSucesso(despesaInserida),
        error: (erro) => this.processarFalha(erro)
      });
  }

  private processarSucesso(despesa: FormsDespesaViewModel): void {
    this.notification.sucesso(`Despesa "${despesa.descricao}" editada com sucesso!`);
    this.router.navigate(['/despesas']);
  }

  private processarFalha(erro: any) {
    if (erro) {
      this.notification.erro(erro);
    }
  }
}
