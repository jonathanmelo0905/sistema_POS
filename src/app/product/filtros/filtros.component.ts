import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { MaterialesService } from 'src/app/services/materiales.service';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.sass']
})
export class FiltrosComponent implements OnInit{

  constructor(private readonly materialesSvc: MaterialesService){}
  estado: boolean = false;
  categorias =[
    {
      id:0,
      name: 'AGUAS LLUVIAS',
      state: false
    },
    {
      id:1,
      name: 'AREA ELECTRICA',
      state: false
    },
    {
      id:2,
      name: 'ACABADOS',
      state: false
    },
    {
      id:3,
      name: 'COMBUSTIBLES',
      state: false
    },
    {
      id:4,
      name: 'RED HIDRAULICA',
      state: false
    },
    {
      id:5,
      name: 'RED SANITARIA',
      state: false
    },
    {
      id:6,
      name: 'CERRAMIENTOS',
      state: false
    },
    {
      id:7,
      name: 'ADITIVOS',
      state: false
    },
    {
      id:8,
      name: 'FERRETERIA',
      state: false
    },
    {
      id:9,
      name: 'HIERROS',
      state: false
    },
    {
      id:10,
      name: 'OBRA GRIS',
      state: false
    },
  ]

  ngOnInit(): void{
    this.materialesSvc.open$.subscribe(res=> {
      setTimeout(()=>{
        this.estado = res;
      },100)
    })
  }

  closeModal(){
    this.estado = false
    setTimeout(()=>{
      this.materialesSvc.openFiltro(false)
    },500)
  }

  verResultados(result: NgForm){
    this.materialesSvc.onFilter(this.categorias);
    this.closeModal();
  }

}
