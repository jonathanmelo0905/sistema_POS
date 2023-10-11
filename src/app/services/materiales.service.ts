import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filtro, Material, Respuesta } from '../models/materiales/materialesModels';
import { BehaviorSubject, Subject } from 'rxjs';
import { Salidas } from '../models/materiales/salidasModels';


@Injectable({
  providedIn: 'root'
})
export class MaterialesService {

  constructor( private http: HttpClient) { }

  private material = new Subject<{label: string, estado: boolean, amount: number}>();
  private open = new BehaviorSubject<boolean>(false);
  private sidebar = new Subject<number>();
  private amount = new BehaviorSubject<number>(0)
  private filtro = new Subject<Filtro[]>();

  filtro$ = this.filtro.asObservable();
  amount$ = this.amount.asObservable();
  data_sidebar$ = this.sidebar.asObservable();
  data$ = this.material.asObservable();
  open$ = this.open.asObservable();

  
  API_URL = 'https://back.habitatconstructores.co/habitat/inventario';
  //API_URL = 'http://localhost:3000/habitat/inventario';

  amountMaterial(amount: number){
    this.amount.next(amount);
  }

  dataTitulo(label: string = '', estado: boolean, amount: number){
    this.material.next({label, estado, amount});
  }

  onFilter(data: Filtro[]){
    this.filtro.next(data)
  }
  sidebarEstado(id: number)
  {
    this.sidebar.next(id)
  }

  openFiltro(estado: boolean){
    this.open.next(estado)
  }

  getMateriales(){
    return this.http.get<Respuesta>(`${this.API_URL}/materiales`);
  }

  getSalidas(id: number){
    return this.http.post<Respuesta>(`${this.API_URL}/getSalidas`, {id:id});
  }

  getAllExits(){
    return this.http.get<Respuesta>(`${this.API_URL}/allExits`)
  }

  postMaterial(data: Material){
    return this.http.post<Respuesta>(`${this.API_URL}/newMaterial`, data)
  }

  updateMaterial(data: Material, id: number){
    return this.http.put<Respuesta>(`${this.API_URL}/updateMaterial/${id}`, data)
  }

  newSalida(data: Salidas){
    return this.http.post<Respuesta>(`${this.API_URL}/newSalida`, data)
  }

}
