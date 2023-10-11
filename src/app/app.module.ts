import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './product/home/home.component';
import { BuscadorComponent } from './product/buscador/buscador.component';
import { ListaComponent } from './product/lista/lista.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CreateComponent } from './product/create/create.component';
import { SalidaHomeComponent } from './salidas/salida-home/salida-home.component';
import { FiltrosComponent } from './product/filtros/filtros.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    BuscadorComponent,
    ListaComponent,
    SidebarComponent,
    CreateComponent,
    SalidaHomeComponent,
    FiltrosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ]
})
export class AppModule { }
