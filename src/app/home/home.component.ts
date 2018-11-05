import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ItemListFiltro, HomeService } from './home.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  params: string;
  totalRegistros = 0;
  filtro = new ItemListFiltro();
  bedSheets = [];
  @ViewChild('tabela') grid;

  constructor(
    private homeService: HomeService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de items');
    this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.homeService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.bedSheets = resultado.items;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
