import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialesService } from 'src/app/services/materiales.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit{

  estado: boolean = true;
  amount: number = 0;
  nameProduct!: string;

  constructor(
    private servicesmaterial: MaterialesService,
    private sidebarSvc: SidebarService,
    private router : Router
  ){}

  ngOnInit(): void {
    this.servicesmaterial.data$.subscribe({
      next: res=>{
        this.nameProduct = res.label
        this.estado = res.estado;
        this.amount = res.amount;
      }
    })
  }

  volver(){
    this.estado = true;
    this.router.navigate(['/product']);
  }

  openSidebar(){
    this.sidebarSvc.openSidebar(true);
  }

}
