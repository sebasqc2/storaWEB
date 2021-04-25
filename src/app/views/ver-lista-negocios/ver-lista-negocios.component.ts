import { Component, OnInit } from '@angular/core';
import { Tienda } from 'src/app/shared/models/tienda.model';
import { DataService } from 'src/app/shared/services/landing-page/tipos_estalecimientos.service';
import { TiendaService } from 'src/app/shared/services/ver-lista-negocios/tienda.service';

@Component({
  selector: 'app-ver-lista-negocios',
  templateUrl: './ver-lista-negocios.component.html',
  styleUrls: ['./ver-lista-negocios.component.css'],
  providers: [TiendaService, DataService]
})
export class VerListaNegociosComponent implements OnInit {

  public arreglo: number[][] = [[1, 2, 3],[4, 5, 6], [7, 8, 9]]
  

  public tiendas: Tienda[]
  public tiendasPorUbicacion: Tienda[]
  public tarjetas: Tienda[][] = []
  public categorias: string[] = []
  cantidadTiendasPorFila: number = 3
  direccion: string


  constructor(public tiendaSvc: TiendaService, private dataSvc: DataService) {}

  ngOnInit(): void {
    this.tiendas = this.tiendaSvc.getTiendas();
    this.direccion = this.tiendaSvc.getDireccion();
    
    this.construirTarjetas()
    this.definirCategorias()
    //this.getTiendas();
  }

  /* definirPaisDepartamentoCiudad(): string[]{
    let i: number = this.direccion.indexOf(',')
    let pais: string = this.direccion.substring(1, i);
    console.log("el pais es: " + pais)
    return [pais,""]
  } */

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

  definirTiendasPorUbicacion(): Tienda[] {
    let ubicacion: string[] = this.definirPaisDeptoCiudad(this.direccion)
    let tiendasPorUbicacion: Tienda[] = []
    let direccion: string[] = []

    for (let tienda of this.tiendas){
      //console.log(tienda.direccion)
      direccion = this.definirPaisDeptoCiudad(tienda.direccion)
      console.log(direccion)

      if(direccion[0] == ubicacion[0] && direccion[1] == ubicacion[1] && direccion[2] == ubicacion[2]){
        tiendasPorUbicacion.push(tienda)
      }
    }

    return tiendasPorUbicacion

  }

  construirTarjetas(): void{
    //this.direccion = this.tiendaSvc.direccion;
    /* this.direccion = this.tiendaSvc.getDireccion();
    console.log("dirección: " + this.direccion) */

    console.log("entra")
    this.tiendasPorUbicacion = this.definirTiendasPorUbicacion()
    this.tarjetas = []

    let cantidadFilas:number = Math.trunc(this.tiendasPorUbicacion.length/this.cantidadTiendasPorFila)
    let f:number = 1
    let t:Tienda[] = []
    for (let tienda of this.tiendasPorUbicacion) {
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

  /* definirCategorias(): void{
    this.categorias.push("Todas")
    for (let tienda of this.tiendas){
      if(!this.categorias.includes(tienda.tipo.nombre))
      this.categorias.push(tienda.tipo.nombre)
    }
  } */

  definirCategorias(): void{
    this.categorias.push("Todas")
    for (let categoria of this.dataSvc.getTiendas()){
      this.categorias.push(categoria.nombre)
    }
  }

  construirTarjetasPorCategoria(categoria: string): void{
    //this.direccion = this.tiendaSvc.direccion;
    /* this.direccion = this.tiendaSvc.getDireccion();
    console.log("dirección: " + this.direccion) */

    let tiendasPorCategoria = this.getTiendasPorCategoria(categoria);
    let cantidadFilas:number = Math.trunc(tiendasPorCategoria.length/this.cantidadTiendasPorFila)
    let f:number = 1
    let t:Tienda[] = []
    this.tarjetas = []
    for (let tienda of tiendasPorCategoria) {
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

  getTiendasPorCategoria(categoria: string): Tienda[]{
    let tiendasPorCategoria: Tienda[] = []
    if (categoria == "Todas"){
      return this.tiendasPorUbicacion
    }
    else{
      for (let tienda of this.tiendasPorUbicacion){
        if(tienda.tipo.nombre == categoria){
          tiendasPorCategoria.push(tienda)
        }
      }
      return tiendasPorCategoria
    }
  }


  /*
  getTiendas() {
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
*/

}
