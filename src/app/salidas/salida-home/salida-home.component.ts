import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Filtro, Material, Materiales } from 'src/app/models/materiales/materialesModels';
import { Salidas } from 'src/app/models/materiales/salidasModels';
import { MaterialesService } from 'src/app/services/materiales.service';

@Component({
  selector: 'app-salida-home',
  templateUrl: './salida-home.component.html',
  styleUrls: ['./salida-home.component.sass']
})
export class SalidaHomeComponent {
  @ViewChild('amount') amount!: ElementRef;
  @ViewChild('movimientos') movimientos!: ElementRef;
  
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
  modal = false;
  salidas: Material[] = [];
  listSalidas: Material[] = []
  id!: number;
  stock!: number;
  mensajeBoton: string = 'Entregar Material';
  mensajeTitulo: string = 'Formulario de entrega de material'

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
  formExit!: FormGroup;

  constructor(
    private apiMaterial: MaterialesService,
    private fb: FormBuilder
  ){}

  ngOnInit(){
    this.apiMaterial.sidebarEstado(0);
    this.formulario();
    this.formulario2();
    this.materialLoad();
    this.isLoad = true;
    this.apiMaterial.open$.subscribe(res=> this.modal = res)
    this.onFilter();
  }
  
  ngAfterViewInit() {
    // Obtén la altura de div-otro y ajusta la max-height de div-hijo
    const alturaDivOtro = this.amount.nativeElement.offsetHeight + 20;
    console.log("alturaDivOtro:", alturaDivOtro)
    this.movimientos.nativeElement.style.maxHeight = `calc(100% - ${alturaDivOtro}px)`;
  }

  scrollToTop() {
    setTimeout(()=>{
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },500)
  }

  materialLoad(){
    this.getSalidas();
    this.apiMaterial.dataTitulo('Salida de material', false, 0)
  }
  
  formulario(){
    this.miFormulario = this.fb.group({
      categoria: new FormControl('',[Validators.required]),
      material: new FormControl('',[Validators.required]),
      und_medida: new FormControl('',[Validators.required]),
      cantidad: new FormControl('',[Validators.required]),
      descripcion: new FormControl('',[Validators.required]),
      bodega: new FormControl('',[Validators.required])
    });
  }

  formulario2(){
    this.formExit = this.fb.group({
      codigo: new FormControl('', Validators.required),
      amount: new FormControl(''),
      cantidad: new FormControl({value: '',disabled: true},[Validators.required, Validators.min(1)]),
      fecha: new FormControl({value: '',disabled: true},[Validators.required]),
      person: new FormControl({value: '',disabled: true},[Validators.required]),
      contratista: new FormControl({value: '',disabled: true},[Validators.required]),
      obra: new FormControl({value: '',disabled: true},[Validators.required])
    });
  }

  enviarMaterial(form: Salidas){
    this.apiMaterial.newSalida(form).subscribe({
      next: async  res=>{
        this.salidas = await this.getMaterial();
        this.listSalidas = this.salidas;
        this.loadMaterial(this.getData()!)
        alert('Se relizo la entrega de material correctamente')
        this.formExit.reset(this.formExit);
      }
    })
  }

  getData(){
    return this.salidas.find(
      n =>n.id == this.formExit.value.codigo
    );
  }


  getSalidas(){
    this.apiMaterial.getMateriales().subscribe({
      next: res=>{
        if(res.estado){
          this.salidas = res.respuesta;
          this.listSalidas = res.respuesta;
          this.isSalidas = false;
        };
      }
    })
  }

  getMaterial(){
    return new Promise<Material[]>((resolve, reject)=>{
      this.apiMaterial.getMateriales().subscribe({
        next: res=>{
          if(res.estado){
            this.isSalidas = false;
            resolve(res.respuesta)
          };
        }
      })      
    })
  }

  loadMaterial(material: Material){
    this.isNew = true;
    this.stock = material.amount
    this.miFormulario.patchValue({
      categoria: material.type_material,
      material: material.name,
      und_medida: material.und_m,
      descripcion: material.description,
      cantidad: material.amount,
      bodega: material.bodega
    })
    this.formExit.get('cantidad')?.enable();
    this.formExit.get('fecha')?.enable();
    this.formExit.get('person')?.enable();
    this.formExit.get('contratista')?.enable();
    this.formExit.get('obra')?.enable();
    this.formExit.reset(this.formExit)
    this.formExit.patchValue({codigo: material.id, amount: material.amount})
    this.formExit.get('cantidad')!.setValidators([Validators.max(this.stock),Validators.required, 
      Validators.min(1)]);
    this.miFormulario.updateValueAndValidity();
    this.scrollToTop();
  }

  onFilter(){
    this.apiMaterial.filtro$.subscribe({
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
            material = material.concat(this.listSalidas.filter( material => {
              return material.type_material == e.name
            }))
      }
    })
    if(bandera){
      this.salidas = material;
    }else{
      this.salidas = this.listSalidas;
    }
  }

}
