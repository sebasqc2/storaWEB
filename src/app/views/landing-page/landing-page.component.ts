import { Component, OnInit, ViewChildren } from '@angular/core';

import { CarouselComponent } from '../../shared/components/carousel/carousel.component'

import { grupoTienda } from '../../shared/models/grupoTienda.model';
import { DataService } from '../../shared/services/landing-page/data-location.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  providers: [DataService]
})
export class LandingPageComponent implements OnInit {
  @ViewChildren(CarouselComponent) carouselComponent;
  
  myCarousel;
	carouselWidth = 640;
	carouselHeight = 220;

  public tiendas: grupoTienda[];

  constructor(private dataSvc: DataService) { }

  ngOnInit() {
    this.tiendas = this.dataSvc.getTiendas();
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