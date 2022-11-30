import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {

  constructor(private snackbar: MatSnackBar) { }

  sucesso(mensagem: string) {
    this.snackbar.open(mensagem, 'OK', {
      panelClass: ['snackbar-sucesso'],
      horizontalPosition: 'center'
    });
  }

  aviso(mensagem: string) {
    this.snackbar.open(mensagem, 'OK', {
      panelClass: ['snackbar-aviso'],
      horizontalPosition: 'center'
    });
  }

  erro(mensagem: string) {
    this.snackbar.open(mensagem, 'OK', {
      panelClass: ['snackbar-erro'],
      horizontalPosition: 'center'
    });
  }
}
