import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import Swal from 'sweetalert2';

import { Producto } from '../../shared/models/producto.model';
import { CrudServiceService } from '../../shared/services/CRUD/crud-service.service';

@Component({
  selector: 'app-producto-tienda',
  templateUrl: './producto-tienda.component.html',
  styleUrls: ['./producto-tienda.component.css']
})
export class ProductoTiendaComponent implements OnInit {

  model: Array<Producto>;
  copia: Array<Producto>;
  public entrada: string;
  bandera: boolean;


  constructor(private crudServices: CrudServiceService) {

    this.model = [];
    this.copia = [];
    this.entrada = '';
    this.bandera = false;
    //this.getProductos();
   }

  ngOnInit(): void {
    
    this.getProductos();
  }

  retardo() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 600);
    });
  }

  limpiarBusqueda() {
    this.model = this.copia;
  }

  getProductos() {    
    this.crudServices.getModel('productos').subscribe(
      data => {
        if (JSON.stringify(data) === '[]') {
          Swal.fire({
            position: 'top-end', icon: 'info', title: 'No hay datos registrados',
            showConfirmButton: false, timer: 1500
          });
        } else {
          this.model = data;
          this.copia = data;
        }
      });
  }

   async getBuscar() {
    if (this.entrada) {
      this.bandera = false;
      this.getBuscarCodigo();

      console.log('calling');
      const result = await this.retardo();
      console.log(result);

      if (!this.bandera) {
        this.getBuscarNombre();
      }

      this.entrada = null;
    } else {
      Swal.fire({ icon: 'error', title: 'Error...', text: 'Campo requerido' });
    }

  }

  getBuscarCodigo() {
    for (var i = 0; i < this.copia.length; i++) {
      if ((this.copia[i].codigo).toString() === this.entrada) {
        this.model = [];
        this.model.push(this.copia[i]);
        this.bandera = true;
        return;
      }
    }
  }

  getBuscarNombre() {
    for (var i = 0; i < this.copia.length; i++) {
      if (this.copia[i].nombreProducto.toUpperCase() === this.entrada.toUpperCase()) {
        this.model = [];
        this.model.push(this.copia[i]);
        this.bandera = true;
        return;
      }
    }
    this.limpiarBusqueda();
    Swal.fire({ icon: 'warning', title: 'Error...', text: 'No se ha encontrado entrenador!' });
  }

}
