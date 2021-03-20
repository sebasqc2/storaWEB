import { Injectable } from '@angular/core';
import { grupoTienda } from '../../models/grupoTienda.model';

@Injectable()
export class DataService {
    private tiendas: grupoTienda[] = [
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
    ];


    getTiendas(): grupoTienda[] {
        return this.tiendas;
    }
}