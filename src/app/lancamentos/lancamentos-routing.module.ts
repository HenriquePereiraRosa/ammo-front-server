import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';

const routes: Routes = [
  {
    path: '',
    component: LancamentosPesquisaComponent,
  },
  {
    path: 'novo',
    component: LancamentoCadastroComponent,
  },
  {
    path: ':id',
    component: LancamentoCadastroComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LancamentosRoutingModule { }
