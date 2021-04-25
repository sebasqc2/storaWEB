import { Component, Input, OnInit, ViewChildren } from '@angular/core';
import { TiendaService } from 'src/app/shared/services/ver-lista-negocios/tienda.service';
import Swal from 'sweetalert2';

import { CarouselComponent } from '../../shared/components/carousel/carousel.component'

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

  public tiendas: grupoTienda[];

  constructor(private dataSvc: DataService, public tiendaSvc: TiendaService) { }

  ngOnInit() {
    this.tiendas = this.dataSvc.getTiendas();
    this.Direccion="";
  }


  cargarTiendas(tienda: grupoTienda):void{
    this.Direccion = this.tiendaSvc.getDireccion()
    console.log("la dirección es: " + this.Direccion)
    
    if(this.Direccion =="" || this.Direccion.length<3){
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