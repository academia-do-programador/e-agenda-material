import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-descricao-pagina',
  template: `
    <p class="my-3 ps-3 fs-6 border-start" >
      <ng-content></ng-content>
    </p>
  `
})
export class DescricaoPaginaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
