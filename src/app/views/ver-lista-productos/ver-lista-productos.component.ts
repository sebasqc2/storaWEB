import { Component, OnInit } from '@angular/core';
import { ProductoTienda} from '../../shared/models/productoTienda.model';
import { Producto } from '../../shared/models/producto.model';
import {Pedido} from '../../shared/models/pedido.model';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Categoria } from '../../shared/models/categoria.model';
import Swal from 'sweetalert2';
import { CrudServiceService } from '../../shared/services/CRUD/crud-service.service';
import { environment } from '../../../environments/environment.prod';
import { ShoppingService } from '../../shared/services/ShoppingCarService/shopping.service';
declare var $ : any;



@Component({
  selector: 'app-ver-lista-productos',
  templateUrl: './ver-lista-productos.component.html',
  styleUrls: ['./ver-lista-productos.component.css']
})
export class VerListaProductosComponent implements OnInit {
  private serverURL = environment.serverUrl;

  
  productosCarro: Producto[] = [
    // { codigo: "string",nombreProducto: "string",stock: 0,precio:0,unidad:" string",imagen:" string",descripcion:"string"}
  ]
  cantidades = [
    // {codigo: "string", cantidad: 0}
  ]

  isLogged: boolean ;
  nombreTienda:string;
  productos;
  categorias: Array<Categoria> ;
  infoTienda;
  totalpedido;
  pedido;
  pedidoFormat =[];
  user;



  form: FormGroup;
  public model: Producto;
  public precio: string;
  public cantidad: number;
  

  //Esta variable es para prueba, borrar al final
  private imageUrl: string = '../../../assets/images/landing-page/carousel/photo-1545420333-23a22b18b8fa.jfif';

  
  

  constructor(private rutaActiva: ActivatedRoute,private crudServices: CrudServiceService, private shoppingCar: ShoppingService,private fb: FormBuilder) { 
    this.productos = [];
    this.categorias = [];
    this.totalpedido=0;
    this.infoTienda ={
      nit: '',
      nombre: '',
      direccion: '',
      telefono: '',
      descripcion: '',
      ciudad: '',
      barrio: '',
      imagen:''
    }


    this.form = this.fb.group({
      price: 1
    });
    this.model = new Producto("1", "default-name", 10, 1,"default-units",  this.imageUrl, "default-descr");
    this.precio = "";
    this.change(1);
  }

  ngOnInit(): void {
    this.nombreTienda=this.rutaActiva.snapshot.params.tienda;
    this.getCategorias();
    this.getInfoTienda(this.nombreTienda); 
    this.verificarUltimoPedido()                   
  }
  getInfoTienda(nombre){
    this.crudServices.getModel(`tiendas/nombre/${nombre}`).subscribe(
      data => {
        if (JSON.stringify(data) === '[]') {
          Swal.fire({
            position: 'center', icon: 'info', title: 'error obteniendo informacion de tienda',
            showConfirmButton: false, timer: 1500
          });
        } else {     
          data.forEach(element => {                        
            this.productos = element.productos;
            this.infoTienda.nit= element.nit;            
            this.infoTienda.nombre= element.nombre;
            this.infoTienda.direccion= element.direccion;
            this.infoTienda.telefono= element.telefono;
            this.infoTienda.descripcion= element.descripcion;
            this.infoTienda.ciudad= element.ubicacion.ciudad;
            this.infoTienda.barrio= element.ubicacion.barrio;
            this.infoTienda.imagen =`${this.serverURL}${(element.logo.formats.thumbnail.url.slice(1))}`;                        
          });    
          this.productos.forEach(element => {
            element.imagen= `${this.serverURL}${(element.imagen.formats.thumbnail.url.slice(1))}`
          });               
        }
      });
      
  }
 
  getCategorias(){
    this.crudServices.getModel('categorias').subscribe(
      data => {
        if (JSON.stringify(data) === '[]') {
          Swal.fire({
            position: 'center', icon: 'info', title: 'error',
            showConfirmButton: false, timer: 1500
          });
        } else {     
          data.forEach(element => {
            let categoria ={
              id:element.id,
              nombre:element.nombre
            }
            this.categorias.push(categoria);
          });                           
        }
      });
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

  actualizarPedido(){
    this.totalpedido += parseInt((this.precio.substr(1)).replace(".",""))     
    if (!this.productosCarro.find(element => element.codigo === this.model.codigo)) {
      this.productosCarro.push(this.model);}
    if (this.cantidades.find(element => element.codigo === this.model.codigo)) { 
      const cant = (this.cantidades.find(element => element.codigo === this.model.codigo)).cantidad
      const index = this.cantidades.indexOf(this.cantidades.find(element => element.codigo === this.model.codigo)) 
      this.cantidades.splice(index, 1); 
      this.cantidades.push({codigo: this.model.codigo, cantidad:cant+this.form.value.price})
    }else{
      this.cantidades.push({codigo: this.model.codigo, cantidad:this.form.value.price})
    } 
    let codigos =[];
    this.productosCarro.forEach(element => {
      codigos.push(element.codigo);
    });

    this.cargarPedido(codigos, this.cantidades, this.totalpedido);
    this.modalPedido(); 

    Swal.fire({
      position: 'center', icon: 'success', title: 'Su pedido fue agregado al carrito de compras',
      showConfirmButton: false, timer: 1500
    });
  }

  eliminarProducto(codigo){
    this.productosCarro= this.productosCarro.filter(element => element.codigo !== codigo)
    let codigos =[];
    this.productosCarro.forEach(element => {
      codigos.push(element.codigo);
    });
    this.cantidades = this.cantidades.filter(element => element.codigo !== codigo)
    this.pedido.productos = codigos
    this.pedido.cantidades = this.cantidades
    const subtotal =
    this.pedidoFormat = this.pedidoFormat.filter(element => element.codigo !== codigo)
  }

  async cargarPedido(codigos,cantidades,total){ 
    let cant = {} 
    for (let index = 0; index < cantidades.length; index++) {
      const element = cantidades[index];
      cant[index]= element
    }
    
    await this.crudServices.getModel(`users/`).subscribe(
      data => {
        if (JSON.stringify(data) === '[]') {
          Swal.fire({
            position: 'center', icon: 'info', title: 'error obteniendo usuario id',
            showConfirmButton: false, timer: 1500
          });
        } else { 
          localStorage.setItem("userid",(data.find(element => element.username === localStorage.getItem("usuario"))).id); 
        }
      });
    this.pedido = new Pedido(Math.floor(this.getRandom(1000,5000)),new Date().toISOString(),0,localStorage.getItem("userid"),codigos,cant,total,'pendiente');            
    // console.log(this.pedido);
    
  }

  modalPedido(){
    this.productosCarro.forEach(element => {
      element["cantidad"] = this.cantidades.find(subElement => subElement.codigo === element.codigo).cantidad
      element["subtotal"] = this.cantidades.find(subElement => subElement.codigo === element.codigo).cantidad * element.precio;
      if (!this.pedidoFormat.find(subElement => subElement.codigo === element.codigo)) {
        this.pedidoFormat.push(element);
      }
    });
  }

  getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }


  limpiarCarrito(){
    this.productosCarro = []
    this.cantidades = []
  }

  modalData(producto){
    this.form = this.fb.group({
      price: 1
    });
    this.model = new Producto(producto.codigo, producto.nombreProducto, producto.stock, producto.precio,producto.unidad,  producto.imagen, producto.descripcion);    
    this.precio = this.convertirpeso(1 * this.model.precio);
  }
  async verificarUltimoPedido(){
    await this.crudServices.getModel(`pedidos/`).subscribe(
      data => {
        if (JSON.stringify(data) === '[]') {
          Swal.fire({
            position: 'center', icon: 'info', title: 'error con la verificacion',
            showConfirmButton: false, timer: 1500
          });
        } else { 
          // data.find(element => element.codigo === localStorage.getItem("ultimoPedido"))
          if (data.find(element => element.codigo === localStorage.getItem("ultimoPedido")).estado === "despachado") {
            Swal.fire({
              position: 'center', icon: 'success', title: 'su ultimo pedido ya fue despachado',
              showConfirmButton: false, timer: 1500
            });
          }
        }
      });
  }

  confirmarPedido(){
    localStorage.setItem("ultimoPedido",JSON.parse(this.pedido.codigo))
    console.log(localStorage.getItem("ultimoPedido"));
    
    this.crudServices.createModel(`pedidos/`,this.pedido).subscribe(
      data => {
        if (JSON.stringify(data) === '[]') {
          Swal.fire({
            position: 'center', icon: 'error', title: 'error ',
            showConfirmButton: false, timer: 1500
          });
        } else {  
          Swal.fire({
            position: 'center', icon: 'success', title: 'Pedido tomado exitosamente ',
            showConfirmButton: false, timer: 1500
          });   
                        
        }
      });

  }

  public closeShoppingModal():void{
    $("#shoppingCar").removeClass("in");
    $(".modal-backdrop").remove();
    $("#shoppingCar").hide();
  }
  

}
