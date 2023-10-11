import { Component } from '@angular/core';
import { MaterialesService } from 'src/app/services/materiales.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.sass']
})
export class BuscadorComponent {

  constructor(private apisMateriales: MaterialesService){}
  
  openFiltro(){
    this.apisMateriales.openFiltro(true);
  }
}
