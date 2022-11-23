import { FormGroup } from "@angular/forms";

export abstract class BaseFormComponent {

  protected exibirMensagensValidacao(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  protected mapearFormularioParaViewModel<T>(formGroup: FormGroup, viewModel: T) {
    return Object.assign({}, viewModel, formGroup.value) as T;
  }
}
