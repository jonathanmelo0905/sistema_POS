import { Component, OnInit } from '@angular/core';
import { Filtro, Material } from 'src/app/models/materiales/materialesModels';
import { MaterialesService } from 'src/app/services/materiales.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.sass']
})
export class ListaComponent implements OnInit{

  public listMaterial: Material[] =[]
  public materiales: Material[] =[]
  amount: number = 0;

  constructor(private materialSvc: MaterialesService){}

  ngOnInit(): void{
    this.getMateriales();
    this.onFilter();
  }

  getMateriales(){
    this.materialSvc.getMateriales().subscribe({
      next: (res)=>{
        this.onAmount(res.respuesta)
        this.materiales = res.respuesta;
        this.listMaterial = res.respuesta;
      },
      error: (err) =>{
        console.error('Error al obtener los materiales');
      }
    });
  }

  onAmount(data: Material[]){
    this.materialSvc.dataTitulo('',true, data.length)
  }

  onFilter(){
    this.materialSvc.filtro$.subscribe({
      next: res =>{
        this.onFilterCategoria(res)
      }
    })
  }

  onFilterCategoria(data: Filtro[]){
    let material: Material[] = [];
    let bandera = false;
    data.forEach(e=>{
      if(e.state){
            bandera = true;
            material = material.concat(this.listMaterial.filter( material => {
              return material.type_material == e.name
            }))
      }
    })
    if(bandera){
      this.materiales = material;
    }else{
      this.materiales = this.listMaterial;
    }
    this.onAmount(this.materiales);
  }


  dataMaterial(data: Material){
    // this.materialSvc.dataMateriales(data)
    sessionStorage.setItem('materiales', JSON.stringify(data))
  }
}
