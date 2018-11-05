import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { ItemList } from '../core/model';
import { ApiHttp } from 'app/security/api-http';

export class ItemListFiltro {
  descricao: string;
  params: string
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class HomeService {

  resourceUrl: string;


  constructor(private http: ApiHttp) {
    this.resourceUrl = `${environment.apiUrl}/resource`;
  }

  pesquisar(filtro: ItemListFiltro): Promise<any> {
    let params = new HttpParams({fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.descricao) {
      params = params.append('descricao', filtro.descricao);
    }

    return this.http.get<any>(`${this.resourceUrl}`)
      .toPromise()
      .then(response => {
        const items = response;
        const resultado = {
          items,
          total: items.length
        };
        return resultado;
      });
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.resourceUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(item: ItemList): Promise<ItemList> {
    return this.http.post<ItemList>(this.resourceUrl, item)
      .toPromise();
  }

  atualizar(item: ItemList): Promise<ItemList> {
    return this.http.put<ItemList>(`${this.resourceUrl}/${item.id}`, item)
      .toPromise()
      .then(response => {
        const itemAlterado = response;
        return itemAlterado;
      });
  }

  buscarPorid(id: number): Promise<ItemList> {
    return this.http.get<ItemList>(`${this.resourceUrl}/${id}`)
      .toPromise()
      .then(response => {
        const item = response;
        return item;
      });
  }


  search(params: string): Promise<any> {
    let httpParams = new HttpParams({fromObject: {} });
    httpParams = httpParams.append('', params);

    return this.http.get<any>(`${environment.apiUrl}/search`)
      .toPromise()
      .then(response => {
        const items = response;
        const resultado = {
          items,
          total: items.length
        };
        return resultado;
      });
  }

}
