import { Component, Input, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { TiendaService } from 'src/app/shared/services/ver-lista-negocios/tienda.service';
import Swal from 'sweetalert2';
import { CarouselComponent } from '../../shared/components/carousel/carousel.component'
import {AuthService} from '../../shared/services/AuthService/auth.service';
import { grupoTienda } from '../../shared/models/grupoTienda.model';
import { DataService } from '../../shared/services/landing-page/tipos_estalecimientos.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  providers: [DataService, TiendaService]
})
export class LandingPageComponent implements OnInit {
  @ViewChildren(CarouselComponent) carouselComponent;

  @Input() Direccion: string;
  
  myCarousel;
	carouselWidth = 640;
	carouselHeight = 220;
  isUser:boolean = true;
  isTendero:boolean = false;
  rol:string;
  public tiendas: grupoTienda[];


  constructor(private auth: AuthService,private router:Router,private dataSvc: DataService,public tiendaSvc: TiendaService) { }


  ngOnInit() {
    this.tiendas = this.dataSvc.getTiendas();
    this.Direccion="";
    if (localStorage.getItem("rol")) {
      this.rol = localStorage.getItem("rol");
      if(this.rol==="Usuario"){
        this.isUser=true
        this.isTendero=false
      }else{
        this.isUser=false
        this.isTendero=true
      }
    }     
  }


  cargarTiendas(tienda: grupoTienda):void{
    /* this.Direccion = this.tiendaSvc.getDireccion()
    console.log("la dirección es: " + this.Direccion) */
    
    /* if(this.Direccion == "" || this.Direccion.length<3){
      Swal.fire({
        position: 'top-end', icon: 'error', title: 'Debe ingresar una dirección valida',
        showConfirmButton: false, timer: 1500
      });
    }else{
      Swal.fire(
        'Ventana',
        ' Establecimientos comerciales!',
        'success'
      )
    } */
    this.tiendaSvc.setCategoria(tienda.nombre)
  }

  onReloadURL(cat: string): void {
    if(this.tiendaSvc.getDireccion() == "" || this.tiendaSvc.getDireccion().length<3){
      console.log("entra")
      Swal.fire({
        position: 'top-end', icon: 'error', title: 'Debe ingresar una dirección valida',
        showConfirmButton: false, timer: 1500
      })
    }else{
      this.tiendaSvc.setCategoria(cat)
      this.router.navigateByUrl("/ver_lista_negocios")
    }
    
  }

  ngAfterViewInit() {
    this.myCarousel = this.carouselComponent.find(elem => elem.id === "my-carousel");
  }

  requestFullscreen() {
    document.documentElement.requestFullscreen();
  }

  handleCarouselEvents(event) {
    if (event.type === "click") {
      console.log(event);
    }
  }

  next() {
    this.myCarousel.next();
  }

  prev() {
    this.myCarousel.prev();
  }

  resize() {
    if (this.carouselWidth === 320) {
      this.carouselWidth = 480;
      this.carouselHeight = 320;
    } else {
      this.carouselWidth = 320;
      this.carouselHeight = 220;
    }
  }

  select(index) {
    this.myCarousel.select(index);
  }

}