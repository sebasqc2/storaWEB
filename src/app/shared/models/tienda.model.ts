import { grupoTienda } from '../models/grupoTienda.model';;

export class Tienda {
    public nit: string;
    public nombre: string;
    public direccion: string;
    public telefono: string;
    public logo: string;
    public descripcion: string;
    public propietario: string;
    public tipo: grupoTienda;
    public valoracion: number;

    constructor(nit: string, nombre: string, direccion: string, telefono: string, logo: string,
                descripcion: string, propietario: string, tipo: grupoTienda, valoracion: number) {
        this.nit = nit;
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.logo = logo;
        this.descripcion = descripcion;
        this.propietario = propietario;
        this.tipo = tipo;
        this.valoracion = valoracion;
    }
}
