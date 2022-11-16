import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shell-user-info',
  templateUrl: './shell-user-info.component.html',
  styles: [
    `
      mat-icon {
        margin-right: 2% ;
      }
    `
  ]
})
export class ShellUserInfoComponent {
  @Input() usuario: any;
  @Input() handset: Observable<boolean>;
  @Output() logout = new EventEmitter<boolean>();

  ativarLogout() {
    this.logout.emit(true);
  }
}
