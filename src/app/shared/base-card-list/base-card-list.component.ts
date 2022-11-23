import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map, Observable, shareReplay } from "rxjs";

export abstract class BaseCardListComponent {
  usuarioMobile$: Observable<boolean>;
  cardSelecionada: string | null;

  constructor(
    breakpointObserver: BreakpointObserver,
  ) {
    this.usuarioMobile$ = breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(map(result => result.matches), shareReplay());
  }

  ativarHover(elemento: string) {
    this.cardSelecionada = elemento;
  }

  desativarHover() {
    this.cardSelecionada = null;
  }
}
