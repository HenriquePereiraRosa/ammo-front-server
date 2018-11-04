import { Http, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { HomeComponent } from 'app/home/home.component';
import { ApiHttp } from './api-http';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule
  ],
  declarations: [HomeComponent],
  providers: [ApiHttp]
})
export class SegurancaModule { }
