import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Producto } from '../../shared/models/producto.model';

@Component({
  selector: 'app-ver-producto-cliente',
  templateUrl: './ver-producto-cliente.component.html',
  styleUrls: ['./ver-producto-cliente.component.css']
})
export class VerProductoClienteComponent {

  form: FormGroup;
  public model: Producto;
  public precio: string;

  //Esta variable es para prueba, borrar al final
  private imageUrl: string = '../../../assets/images/landing-page/carousel/photo-1545420333-23a22b18b8fa.jfif';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      price: 1
    });

    this.model = new Producto("1", "Hamburguesa Tradicional", 12, 12000, true, this.imageUrl);
    this.precio = "";
    this.change(1);
  }

  change(value: number): void {
    this.convertirpeso(value * this.model.precio);
  }

  convertirpeso(value: number):void {
    const formatterPeso = new Intl.NumberFormat('es-CO', {
       style: 'currency',
       currency: 'COP',
       minimumFractionDigits: 0
     })
     this.precio =(formatterPeso.format(value))
  }



}
