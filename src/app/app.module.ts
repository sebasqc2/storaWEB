import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';

import { IvyCarouselModule } from '../app/shared/components/carousel/carousel.module';

import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { NgxNumberSpinnerModule } from 'ngx-number-spinner';

import { VerProductoClienteComponent } from './views/ver-producto-cliente/ver-producto-cliente.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgregarProductoComponent } from './views/agregar-producto/agregar-producto.component';
import { ProductoTiendaComponent } from './views/producto-tienda/producto-tienda.component';
import { EditarProductoComponent } from './views/editar-producto/editar-producto.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavbarComponent,
    FooterComponent,
    VerProductoClienteComponent,
    AgregarProductoComponent,
    ProductoTiendaComponent,
    EditarProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IvyCarouselModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    NgxNumberSpinnerModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
