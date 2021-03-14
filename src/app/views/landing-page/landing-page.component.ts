import { Component, OnInit, ViewChildren } from '@angular/core';
import { CarouselComponent } from '../../shared/components/carousel/carousel.component';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  myCarousel;
  carouselWidth = 640;
  carouselHeight = 220;

  images = [
    {
      path: '../../../assets/images/landing-page/carousel/1.jpg'
    },
    {
      path: '../../../assets/images/landing-page/carousel/2.jpg'
    },
    {
      path: '../../../assets/images/landing-page/carousel/3.jpg'
    },
    {
      path: '../../../assets/images/landing-page/carousel/4.jpg'
    },
    {
      path: '../../../assets/images/landing-page/carousel/5.jpg'
    },
    {
      path: '../../../assets/images/landing-page/carousel/6.jpg'
    },
    {
      path: '../../../assets/images/landing-page/carousel/7.jpg'
    },
    {
      path: '../../../assets/images/landing-page/carousel/8.jpg'
    }
  ];

  images2 = [
    {
      path: '../../../assets/images/landing-page/carousel/photo-1444065707204-12decac917e8.jfif',
    },
    {
      path: '../../../assets/images/landing-page/carousel/photo-1445452916036-9022dfd33aa8.jfif',
    },
    {
      path: '../../../assets/images/landing-page/carousel/photo-1443996104801-80c82e789b18.jfif',
    },
    {
      path: '../../../assets/images/landing-page/carousel/photo-1505839673365-e3971f8d9184.jfif',
    },
    {
      path: '../../../assets/images/landing-page/carousel/photo-1545420333-23a22b18b8fa.jfif',
    },
  ];

  @ViewChildren(CarouselComponent) carouselComponent;

  ngOnInit() {
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

  addImage() {
    this.images.push({
      path: '../../../assets/images/landing-page/carousel/9.jpg'
    });
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

  changeImagesArray() {
    this.images = this.images2;
  }
}