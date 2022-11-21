import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { VisualizarDespesaViewModel } from "../view-model/visualizar-despesa.view-model";
import { DespesaService } from "./despesa.service";

@Injectable()
export class VisualizarDespesaResolver implements Resolve<VisualizarDespesaViewModel> {

  constructor(private despesaService: DespesaService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<VisualizarDespesaViewModel> {
    return this.despesaService.selecionarDespesaCompletaPorId(route.params['id']);
  }
}
