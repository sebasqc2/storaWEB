import { Injectable } from '@angular/core';
import { Producto } from '../../models/producto.model';;

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  private static categoriaTiendas: string
  //direccion: string = "sin direccion"

  private productos: Producto[] = [
    // { codigo: "string",nombreProducto: "string",stock: 0,precio:0,unidad:" string",imagen:" string",descripcion:"string"}
  ]

  private cantidades = [
    // {codigo: "string", cantidad: 0}
  ]

  agregarProducto(producto:Producto,cantidad:number){
    if (!this.productos.find(element => element.codigo === producto.codigo)) {
      this.productos.push(producto);}
    if (this.cantidades.find(element => element.codigo === producto.codigo)) { 
      const cant = (this.cantidades.find(element => element.codigo === producto.codigo)).cantidad
      const index = this.cantidades.indexOf(this.cantidades.find(element => element.codigo === producto.codigo)) 
      this.cantidades.splice(index, 1); 
      this.cantidades.push({codigo: producto.codigo, cantidad:cant+cantidad})
    }else{
      this.cantidades.push({codigo: producto.codigo, cantidad:cantidad})
    }

    localStorage.setItem("cartProductos",JSON.stringify(this.productos));
    localStorage.setItem("cartCantidades", JSON.stringify(this.cantidades));
  }

  limpiarCarrito(){
    this.productos = []
    this.cantidades = []
  }


  getProductos(){
    return this.productos
  }
  getCantidades (){
    return this.cantidades
  }

  setCategoria(categoria: string):void{
    ShoppingService.categoriaTiendas = categoria
  }

  getCategoria(): string{
    return ShoppingService.categoriaTiendas
  }
}
