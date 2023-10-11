import { Component, OnInit } from '@angular/core';
import { MaterialesService } from 'src/app/services/materiales.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  selectId: number = 1;
  open = false;

  constructor(
    private servicesInventario: MaterialesService,
    private readonly sidebarSvc: SidebarService
  ){}

  ngOnInit(): void {
      this.servicesInventario.data_sidebar$.subscribe({
        next: res=>{
          this.selectId = res;
        }
      })
      this.openSidebar();
  }

  seleccion(id: number){
    this.selectId = id
    this.open = false;
  }

  openSidebar(){
    this.sidebarSvc.sidebar$.subscribe({
      next: res=>{
        this.open = res;
      }
    })
  }

}
