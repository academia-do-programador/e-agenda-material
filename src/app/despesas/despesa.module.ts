import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from "ng2-currency-mask";
import { NgxMaskModule } from 'ngx-mask';

import { DespesaRoutingModule } from './despesa-routing.module';
import { EditarDespesaComponent } from './editar/editar-despesa.component';
import { ExcluirDespesaComponent } from './excluir/excluir-despesa.component';
import { InserirDespesaComponent } from './inserir/inserir-despesa.component';
import { ListarDespesaComponent } from './listar/listar-despesa.component';
import { DespesaService } from './services/despesa.service';
import { FormsDespesaResolver } from './services/forms-despesa.resolver';
import { VisualizarDespesaResolver } from './services/visualizar-despesa.resolver';

import { CategoriaModule } from '../categorias/categoria.module';
import { SharedModule } from '../shared/shared.module';

const CurrencyMaskConfig: CurrencyMaskConfig = {
  align: "left",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};

@NgModule({
  declarations: [
    ListarDespesaComponent,
    InserirDespesaComponent,
    EditarDespesaComponent,
    ExcluirDespesaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    CurrencyMaskModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),

    DespesaRoutingModule,
    SharedModule,
    CategoriaModule
  ],

  providers: [
    DespesaService,
    FormsDespesaResolver,
    VisualizarDespesaResolver,
    { provide: CURRENCY_MASK_CONFIG, useValue: CurrencyMaskConfig }
  ]
})
export class DespesaModule { }
