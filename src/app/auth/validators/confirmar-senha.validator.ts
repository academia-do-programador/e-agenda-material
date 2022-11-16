import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function confirmarSenhaValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const senha = control.get('senha')?.value;
    const confirmarSenha = control.get('confirmarSenha')?.value;

    if (senha !== confirmarSenha) {
      return { senhasIncompativeis: true };
    }

    return null;
  }
}
