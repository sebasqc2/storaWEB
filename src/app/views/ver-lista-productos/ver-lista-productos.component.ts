import { Component, OnInit } from '@angular/core';
import { ProductoTienda} from '../../shared/models/productoTienda.model';
import { Producto } from '../../shared/models/producto.model';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Categoria } from '../../shared/models/categoria.model';
import Swal from 'sweetalert2';
import { CrudServiceService } from '../../shared/services/CRUD/crud-service.service';
import { environment } from '../../../environments/environment.prod';



@Component({
  selector: 'app-ver-lista-productos',
  templateUrl: './ver-lista-productos.component.html',
  styleUrls: ['./ver-lista-productos.component.css']
})
export class VerListaProductosComponent implements OnInit {
  private serverURL = environment.serverUrl;

  nombreTienda:string;
  productos;
  categorias: Array<Categoria> ;
  infoTienda;


  form: FormGroup;
  public model: Producto;
  public precio: string;

  //Esta variable es para prueba, borrar al final
  private imageUrl: string = '../../../assets/images/landing-page/carousel/photo-1545420333-23a22b18b8fa.jfif';

  
  

  constructor(private rutaActiva: ActivatedRoute,private crudServices: CrudServiceService,private fb: FormBuilder) { 
    this.productos = [];
    this.categorias = [];
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

  cargarPedido(){
    Swal.fire({
      position: 'center', icon: 'success', title: 'Su pedido fue agregado al carrito de compras',
      showConfirmButton: false, timer: 1500
    });
  }

  modalData(producto){
    this.model = new Producto(producto.codigo, producto.nombreProducto, producto.stock, producto.precio,producto.unidad,  producto.imagen, producto.descripcion);    
  }
  

}
