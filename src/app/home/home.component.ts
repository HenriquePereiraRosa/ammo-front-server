import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { ItemListFiltro, HomeService } from './home.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalRegistros = 0;
  filtro = new ItemListFiltro();
  bedSheets = [];
  @ViewChild('tabela') grid;

  constructor(
    private homeService: HomeService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Lencol Avulso');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.homeService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.bedSheets = resultado.items; // .lancamentos;
        // DEBUG
        console.log(`Recursos: ${JSON.stringify(resultado)}`);
        console.log(`Lencois: ${JSON.stringify(this.bedSheets)}`);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {
    this.homeService.excluir(lancamento.id)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }
        this.messageService.add({ severity: 'success', detail: 'Recurso excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
