import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';

import { IvyCarouselModule } from '../app/shared/components/carousel/carousel.module';

import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { NgxNumberSpinnerModule } from 'ngx-number-spinner';

import { VerProductoClienteComponent } from './views/ver-producto-cliente/ver-producto-cliente.component';
import { LoginComponent } from './views/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavbarComponent,
    FooterComponent,
    VerProductoClienteComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    IvyCarouselModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    NgxNumberSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
