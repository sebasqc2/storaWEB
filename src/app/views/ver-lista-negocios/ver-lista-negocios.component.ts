import { Component, OnInit } from '@angular/core';
import { Tienda } from 'src/app/shared/models/tienda.model';
import { DataService } from 'src/app/shared/services/landing-page/tipos_estalecimientos.service';
import { TiendaService } from 'src/app/shared/services/ver-lista-negocios/tienda.service';
import { CrudServiceService } from '../../shared/services/CRUD/crud-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-lista-negocios',
  templateUrl: './ver-lista-negocios.component.html',
  styleUrls: ['./ver-lista-negocios.component.css'],
  providers: [TiendaService, DataService]
})
export class VerListaNegociosComponent implements OnInit {

  model: Array<Tienda>;
  copia: Array<Tienda>;
  private tiendas: Array<Tienda>;

  private ubicacion: string
  private categoria: string
  //private tiendas: Tienda[]
  public tarjetas: Tienda[][]
  private cantidadTiendasPorFila: number = 3
  public categorias: string[]
 

  constructor(private router: Router, public tiendaSvc: TiendaService, private dataSvc: DataService, private crudServices: CrudServiceService) {
    /* this.getTiendas();*/
    this.definirCategorias(); 
  }

  ngOnInit() {
  /*async ngOnInit() {
    console.log('calling');
    const result = await this.retardo();
    console.log(result); */

    this.ubicacion = this.tiendaSvc.getDireccion()
    this.categoria = this.tiendaSvc.getCategoria()
    this.tiendas = this.tiendaSvc.getTiendas()

    let tiendasAplican = this.generarTiendasAplican()
    this.construirTarjetas(tiendasAplican)
  }

  retardo() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 600);
    });
  }

  generarTiendasAplican():Tienda[]{
    let tiendasAplican: Tienda[] = []
    let paisDeptoCiudadPag: string[] = this.definirPaisDeptoCiudad(this.ubicacion)
    let paisDeptoCiudadTienda: string[]

    console.log(this.model)
    for (let tienda of this.tiendas) {
      paisDeptoCiudadTienda = this.definirPaisDeptoCiudad(tienda.direccion)
      if(paisDeptoCiudadPag[0] === paisDeptoCiudadTienda[0] && paisDeptoCiudadPag[1] == paisDeptoCiudadTienda[1] && paisDeptoCiudadPag[2] == paisDeptoCiudadTienda[2]){
        if(this.categoria == tienda.tipo.nombre || this.categoria == "Todas"){
          tiendasAplican.push(tienda)
        }
      }
    }
    return tiendasAplican
  }

  construirTarjetas(tiendasAplican: Tienda[]): void{
    let cantidadFilas:number = Math.trunc(tiendasAplican.length/this.cantidadTiendasPorFila)
    let f:number = 1
    let t:Tienda[] = []
    this.tarjetas = []
    for (let tienda of tiendasAplican) {
      if(f > this.cantidadTiendasPorFila){
        f = 1
        this.tarjetas.push(t)
        t = []
      }
      t.push(tienda)
      f++
    }
    this.tarjetas.push(t)
  }

  cambiarCategoria(tipo: string): void{
    this.categoria = tipo
    let tiendasAplican = this.generarTiendasAplican()
    this.construirTarjetas(tiendasAplican)
  }

  definirPaisDeptoCiudad(dir: string): string[]{
    let cadenaAux: string = dir
    let i: number = cadenaAux.indexOf(',')
    let pais: string = cadenaAux.substring(0, i);
    pais = pais.toLowerCase()

    //console.log("la longitud de la cadena es: " + cadenaAux.length)
    
    cadenaAux = cadenaAux.substring(i+1, cadenaAux.length);
    i = cadenaAux.indexOf(',')
    let departamento: string = cadenaAux.substring(0, i);
    departamento = departamento.toLowerCase()
    
    //console.log("la longitud de la cadena es: " + cadenaAux.length)
    
    cadenaAux = cadenaAux.substring(i+1, cadenaAux.length);
    i = cadenaAux.indexOf(',')
    let ciudad: string = cadenaAux.substring(0, i);
    ciudad = ciudad.toLowerCase()

    //console.log("la longitud de la cadena es: " + cadenaAux.length)

    return [pais, departamento, ciudad]
  }

  definirCategorias(): void{
    this.categorias = []
    this.categorias.push("Todas")
    for (let categoria of this.dataSvc.getTiendas()){
      this.categorias.push(categoria.nombre)
    }
  }

  onReloadURL(cat: string): void {
    this.tiendaSvc.setCategoria(cat)
    this.router.navigateByUrl("/ver_lista_negocios")
  }

  imprimeNombreNegocio(nombre: string): void {
    console.log("El nombre del negocio es: " + nombre)
  }
 
  getTiendas() {
    this.crudServices.getModel('tiendas').subscribe(
      data => {
        if (JSON.stringify(data) === '[]') {
          Swal.fire({
            position: 'top-end', icon: 'info', title: 'No hay datos registrados',
            showConfirmButton: false, timer: 1500
          });
        } else {
          
          this.model = data
          this.tiendas = data;
        }
      });
  }
  /*
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
 */
  
}
