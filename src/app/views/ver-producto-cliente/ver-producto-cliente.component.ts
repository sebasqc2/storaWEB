import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

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

    this.model = new Producto("1", "Burro Ñoño", 12, 12000, true, this.imageUrl, "Tortilla pequeña, proteína a elegir, tocineta premium, trocitos de chorizo coctel, queso Americano, salsa de frijol refrito, guacamole, lechuga, pico de gallo y slasa de la casa.");
    this.precio = "";
    this.change(1);
  }

  change(value: number): void {
    this.precio = this.convertirpeso(value * this.model.precio);
  }

  convertirPrecio():string{
    return this.convertirpeso(this.model.precio);
  }

  convertirpeso(value: number):string {
    const formatterPeso = new Intl.NumberFormat('es-CO', {
       style: 'currency',
       currency: 'COP',
       minimumFractionDigits: 0
     })
    return formatterPeso.format(value)
  }

  cargarPedido(){
    Swal.fire({
      position: 'top-end', icon: 'success', title: 'Su pedido fue agregado al carrito de compras',
      showConfirmButton: false, timer: 1500
    });
  }

}
