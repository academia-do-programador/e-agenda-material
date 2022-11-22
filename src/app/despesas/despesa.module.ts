import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from "ng2-currency-mask";

import { DespesaRoutingModule } from './despesa-routing.module';
import { DespesaService } from './services/despesa.service';
import { FormsDespesaResolver } from './services/forms-despesa.resolver';
import { VisualizarDespesaResolver } from './services/visualizar-despesa.resolver';
import { CategoriaModule } from '../categorias/categoria.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';

import { SharedModule } from '../shared/shared.module';
import { InserirDespesaComponent } from './inserir/inserir-despesa.component';
import { ListarDespesaComponent } from './listar/listar-despesa.component';
import { NgxMaskModule } from 'ngx-mask';

const customCurrencyMaskConfig: CurrencyMaskConfig = {
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
    InserirDespesaComponent
  ],
  imports: [
    CommonModule,
    DespesaRoutingModule,
    NgxMaskModule.forRoot(),

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
    SharedModule,
    CategoriaModule,
    CurrencyMaskModule
  ],

  providers: [
    DespesaService,
    FormsDespesaResolver,
    VisualizarDespesaResolver,
    { provide: CURRENCY_MASK_CONFIG, useValue: customCurrencyMaskConfig }
  ]
})
export class DespesaModule { }
