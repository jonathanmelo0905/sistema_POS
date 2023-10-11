import { Component } from '@angular/core';
import { MaterialesService } from 'src/app/services/materiales.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {

  model = {
    categoria: "",
    material: "",
    und_medida: "",
    cantidad: "",
    despcripcion: "",
    bodega: ""
  }
  modal: boolean = false;

  constructor(private servicesInventario: MaterialesService) { }

  ngOnInit(): void {
    this.servicesInventario.sidebarEstado(1);
    this.servicesInventario.open$.subscribe(res=> this.modal = res)
  }

  enviarMaterial(form: any){
    console.log('form value...',form.value); 
  }

}
