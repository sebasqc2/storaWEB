import { Injectable } from '@angular/core';
import { Tienda } from '../../models/tienda.model';
import { grupoTienda } from '../../models/grupoTienda.model';;

@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  private static direccion: string
  //direccion: string = "sin direccion"

  private gruposTiendas: grupoTienda[] = [
    { id_grupo_tienda: "1", nombre: "Almacenes", icono: "fas fa-store fa-2x", descripcion:""}, 
    { id_grupo_tienda: "2", nombre: "Carnicería | Pesquería | Fama", icono: "fas fa-balance-scale fa-2x", descripcion:""}, 
    { id_grupo_tienda: "3", nombre: "Droguería", icono: "fas fa-pills fa-2x", descripcion:""}, 
    { id_grupo_tienda: "4", nombre: "Ferretería | Construcción", icono: "fas fa-tools fa-2x", descripcion:""}, 
    { id_grupo_tienda: "5", nombre: "Frutas | Verduras", icono: "fas fa-carrot fa-2x", descripcion:""}, 
    { id_grupo_tienda: "6", nombre: "Joyería | Artesanías", icono: "fas fa-ring fa-2x", descripcion:""}, 
    { id_grupo_tienda: "7", nombre: "Licores | Cigarrería", icono: "fas fa-beer fa-2x", descripcion:""}, 
    { id_grupo_tienda: "8", nombre: "Minimercado", icono: "fas fa-shopping-basket fa-2x", descripcion:""}, 
    { id_grupo_tienda: "9", nombre: "Miscelánea | Cacharrería", icono: "fas fa-dice fa-2x", descripcion:""}, 
    { id_grupo_tienda: "10", nombre: "Panadería | Pastelería", icono: "fas fa-birthday-cake fa-2x", descripcion:""}, 
    { id_grupo_tienda: "11", nombre: "Papelería | Librería", icono: "fas fa-book fa-2x",descripcion:""}, 
    { id_grupo_tienda: "12", nombre: "Restaurante", icono: "fas fa-utensils fa-2x", descripcion:""}, 
    { id_grupo_tienda: "13", nombre: "Servicios", icono: "fas fa-hands-helping fa-2x", descripcion:""}, 
    { id_grupo_tienda: "14", nombre: "Supermercado", icono: "fas fa-shopping-cart fa-2x", descripcion:""}, 
    { id_grupo_tienda: "15", nombre: "Veterinaria | Zootecnia", icono: "fas fa-paw fa-2x", descripcion:""}, 
    { id_grupo_tienda: "16", nombre: "Otros", icono: "far fa-question-circle fa-2x", descripcion:""}
  ]

  private direcciones: string[] = [
    "Colombia,Caldas,Manizales,algo",
    "Colombia,Caldas,Chinchina,algo",
    "Colombia,Antioquia,Medellin,algo",
    "Colombia,Antioquia,Envigado,algo",
    "Colombia,Atlantico,Barranquilla,algo",
    "Colombia,Cundinamarca,Bogota,algo"
  ]

  private srcLogo: string = "data:image/png;base64,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"

  private tiendas: Tienda[] = [
    { nit: "1", nombre: "Negocio1", direccion: this.direcciones[0], telefono: "111 111" , logo: this.srcLogo, descripcion: "descripcion 1", propietario: "Felipe", tipo: this.gruposTiendas[0], valoracion: 5},
    { nit: "2", nombre: "Negocio2", direccion: this.direcciones[0], telefono: "111 111" , logo: this.srcLogo, descripcion: "descripcion 2", propietario: "Felipe", tipo: this.gruposTiendas[0], valoracion: 5},
    { nit: "3", nombre: "Negocio3", direccion: this.direcciones[0], telefono: "111 111" , logo: this.srcLogo, descripcion: "descripcion 3", propietario: "Felipe", tipo: this.gruposTiendas[0], valoracion: 5},
    { nit: "4", nombre: "Negocio4", direccion: this.direcciones[0], telefono: "111 111" , logo: this.srcLogo, descripcion: "descripcion 4", propietario: "Felipe", tipo: this.gruposTiendas[0], valoracion: 5},
    { nit: "5", nombre: "Negocio5", direccion: this.direcciones[0], telefono: "111 111" , logo: this.srcLogo, descripcion: "descripcion 5", propietario: "Felipe", tipo: this.gruposTiendas[0], valoracion: 5},
    { nit: "6", nombre: "Negocio6", direccion: this.direcciones[0], telefono: "111 111" , logo: this.srcLogo, descripcion: "descripcion 6", propietario: "Felipe", tipo: this.gruposTiendas[1], valoracion: 5},
    { nit: "7", nombre: "Negocio7", direccion: this.direcciones[2], telefono: "111 111" , logo: this.srcLogo, descripcion: "descripcion 7", propietario: "Felipe", tipo: this.gruposTiendas[5], valoracion: 5},
    { nit: "8", nombre: "Negocio8", direccion: this.direcciones[2], telefono: "111 111" , logo: this.srcLogo, descripcion: "descripcion 8", propietario: "Felipe", tipo: this.gruposTiendas[5], valoracion: 5},
    { nit: "9", nombre: "Negocio9", direccion: this.direcciones[2], telefono: "111 111" , logo: this.srcLogo, descripcion: "descripcion 9", propietario: "Felipe", tipo: this.gruposTiendas[4], valoracion: 5},
    { nit: "10", nombre: "Negocio10", direccion: this.direcciones[1], telefono: "111 111" , logo: this.srcLogo, descripcion: "descripcion 10", propietario: "Felipe", tipo: this.gruposTiendas[3], valoracion: 5},
    { nit: "11", nombre: "Negocio11", direccion: this.direcciones[1], telefono: "111 111" , logo: this.srcLogo, descripcion: "descripcion 11", propietario: "Felipe", tipo: this.gruposTiendas[3], valoracion: 5},
    { nit: "12", nombre: "Negocio12", direccion: this.direcciones[1], telefono: "111 111" , logo: this.srcLogo, descripcion: "descripcion 12", propietario: "Felipe", tipo: this.gruposTiendas[2], valoracion: 5},
];

  getTiendas(): Tienda[] {
    return this.tiendas;
  }

  setDireccion(direccion: string):void {
    TiendaService.direccion = direccion
  }

  getDireccion(): string{
    return TiendaService.direccion 
  }
}
