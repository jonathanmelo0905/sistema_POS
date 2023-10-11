import { ViewportScroller } from '@angular/common';
import { AfterContentInit, ChangeDetectorRef, Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Material, Materiales } from 'src/app/models/materiales/materialesModels';
import { Salidas } from 'src/app/models/materiales/salidasModels';
import { MaterialesService } from 'src/app/services/materiales.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})

export class CreateComponent implements OnInit {

  model: Materiales = {
    categoria: "",
    material: "",
    und_medida: "",
    cantidad: 0,
    descripcion: "",
    bodega: ""
  }

  isLoad: boolean = false;
  isNew: boolean = false;
  isSalidas: boolean = true;
  salidas: Salidas[] = []
  id!: number;
  stock!: number;
  mensajeBoton: string = 'Cargar Material';
  mensajeTitulo: string = 'Ingresar nuevo material'

  material: Material = <Material>{}

  undMedida = [
    {id: 0,name: "BULTOS"},
    {id:1, name: "CUÑETE"},
    {id:2, name: "GALON"},
    {id:3, name: "KG"},
    {id:4, name: "LIBRAS"},
    {id:5, name: "LITRO"},
    {id:6, name: "M2"},
    {id:7, name: "M3"},
    {id:8, name: "METRO LINEAL"},
    {id:9, name: "UNIDADES"}
  ]
  categorias =[
    {
      id:0,
      name: 'AGUAS LLUVIAS'
    },
    {
      id:1,
      name: 'AREA ELECTRICA'
    },
    {
      id:2,
      name: 'ACABADOS'
    },
    {
      id:3,
      name: 'COMBUSTIBLES'
    },
    {
      id:4,
      name: 'RED HIDRAULICA'
    },
    {
      id:5,
      name: 'RED SANITARIA'
    },
    {
      id:6,
      name: 'CERRAMIENTOS'
    },
    {
      id:7,
      name: 'ADITIVOS'
    },
    {
      id:8,
      name: 'FERRETERIA'
    },
    {
      id:9,
      name: 'HIERROS'
    },
    {
      id:10,
      name: 'OBRA GRIS'
    },
  ]

  miFormulario!: FormGroup;

  constructor(
    private apiMaterial: MaterialesService,
    private fb: FormBuilder,
    private router: Router,
    private viewportScroller: ViewportScroller
  ){}

  ngOnInit(){
    this.formulario();
    this.materialLoad();
    this.isLoad = true;
    this.scrollToTop();
  }

  scrollToTop() {
    setTimeout(()=>{
      this.viewportScroller.scrollToPosition([0, 0]);
    },500)
  }

  materialLoad(){
    let data: Material = JSON.parse(sessionStorage.getItem('materiales') || 'false')
    let mensaje = '';
    if(data){
      this.id = data.id;
      this.miFormulario.patchValue({
        categoria: data.type_material,
        material: data.name,
        und_medida: data.und_m,
        descripcion: data.description,
        cantidad: data.amount,
        bodega: data.bodega
      })
      this.stock = data.amount;
      this.isNew = true;
      this.mensajeBoton = 'Actualizar Material'
      this.mensajeTitulo = 'Actualizar material'
      mensaje = data.description.toUpperCase();
      sessionStorage.removeItem('materiales')
    }else{
      this.isNew = false;
      mensaje = 'Registre sus productos';
      console.log(this.isNew)
    }
    this.apiMaterial.dataTitulo(mensaje, false, 0)
  }
  
  formulario(){
    this.miFormulario = this.fb.group({
      categoria: new FormControl('',[Validators.required]),
      material: new FormControl('',[Validators.required]),
      und_medida: new FormControl('',[Validators.required]),
      cantidad: new FormControl('',[Validators.required,Validators.min(0)]),
      descripcion: new FormControl('',[Validators.required]),
      bodega: new FormControl('',[Validators.required])
    });
  }

  enviarMaterial(form: Materiales, estado: boolean = false){
    console.log('form value...',form);
    if(!estado){
      this.AgregarNuevoMatrial(form);
    }else{
      console.log('actualizar material')
      this.updateMaterial(form);
    }
  }

  AgregarNuevoMatrial(form: Materiales){
    this.material.amount = form.cantidad;
    this.material.name = form.material.toUpperCase();
    this.material.description = form.descripcion.toUpperCase();
    this.material.und_m = form.und_medida;
    this.material.type_material = form.categoria.toUpperCase();
    this.material.bodega = form.bodega.toUpperCase();
    this.apiMaterial.postMaterial(this.material).subscribe({
      next: res => {
        if(res.estado){
          alert("Se agrego el nuevo material");
          this.router.navigate(['/product'])
        }
      },
      error: err => {
        console.log(" err:", err)
      }
    })
  }

  updateMaterial(form: Materiales){
    this.material.amount = this.stock;
    this.material.name = form.material.toUpperCase();
    this.material.description = form.descripcion.toUpperCase();
    this.material.und_m = form.und_medida;
    this.material.type_material = form.categoria.toUpperCase();
    this.material.bodega = form.bodega.toUpperCase();
    this.apiMaterial.updateMaterial(this.material, this.id).subscribe({
      next: res => {
        if(res.estado){
          alert("Se actualizo el material");
          this.router.navigate(['/product'])
        }
      },
      error: err => {
        console.log(" err:", err)
      }
    })
  }

  getSalidas(){
    this.apiMaterial.getSalidas(this.id).subscribe({
      next: res=>{
        console.log(res,'salidas');
        if(res.estado){
          this.salidas = res.respuesta
          this.isSalidas = false;
        };
      }
    })
  }
}
