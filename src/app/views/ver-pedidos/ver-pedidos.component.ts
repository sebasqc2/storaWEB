import { Component, OnInit } from '@angular/core';
import { Producto } from '../../shared/models/producto.model';
import {Pedido} from '../../shared/models/pedido.model';
import Swal from 'sweetalert2';
import { CrudServiceService } from '../../shared/services/CRUD/crud-service.service';
declare var $ : any;

@Component({
  selector: 'app-ver-pedidos',
  templateUrl: './ver-pedidos.component.html',
  styleUrls: ['./ver-pedidos.component.css']
})
export class VerPedidosComponent implements OnInit {
  pedidos;
  productos;
  productosPedido;
  checking;

  constructor(private crudServices: CrudServiceService) {
    this.pedidos =[];
    this.productos =[];
    this.productosPedido = [];
   }

  ngOnInit(): void {
    this.getPedidos()
  }

  async getPedidos(){
    await this.crudServices.getModel(`pedidos/`).subscribe(
      data => {
        if (JSON.stringify(data) === '[]') {
          Swal.fire({
            position: 'center', icon: 'info', title: 'error obteniendo los pedidos',
            showConfirmButton: false, timer: 1500
          });
        } else {   
          data.forEach(element => {
              element.fecha = new Date(element.fecha)
          });
          this.pedidos = data           
        }
      });
      this.getAllProducts()
  }
  async getAllProducts(){
    await this.crudServices.getModel(`productos/`).subscribe(
      data => {
        if (JSON.stringify(data) === '[]') {
          Swal.fire({
            position: 'center', icon: 'info', title: 'error obteniendo los productos',
            showConfirmButton: false, timer: 1500
          });
        } else {     
          this.productos = data           
        }
      });
  }

  revisarPedido(pedido){
    this.checking = pedido
    this.productosPedido = []
    const cant = pedido.cantidades
    for (let index = 0; index < Object.keys(cant).length; index++) {
      let prod = this.productos.find(element => element.codigo === cant[index].codigo)
      prod["cantidad"] = cant[index].cantidad
      prod["subtotal"] = cant[index].cantidad * prod.precio
      prod["preparado"] = false
      this.productosPedido.push(prod);   
    }
    const indice = this.pedidos.indexOf(this.pedidos.find(element => element.codigo === pedido.codigo))
    this.pedidos[indice].estado = "procesando"
    this.openCheckingModal();
  }

  async despacharPedido(){
    this.checking.estado = "despachado"
    await this.crudServices.putModel(`pedidos/${this.checking.id}`,this.checking).subscribe(
      data => {
        if (JSON.stringify(data) === '[]') {
          Swal.fire({
            position: 'center', icon: 'info', title: 'error ',
            showConfirmButton: false, timer: 1500
          });
        } else {   
          this.closeCheckingModal();         
        }
      });
      
  }

 openCheckingModal():void{
    $('#check').modal('toggle')
  }

  closeCheckingModal():void{
    $("#check").removeClass("in");
    $(".modal-backdrop").remove();
    $("#check").hide();
  }

}
