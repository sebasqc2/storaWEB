export class Producto {

    public codigo: string;
    public nombreProducto: string;
    public stock: number;
    public precio: number;
    public unidad: string;
    public imagen: string;
    public descripcion:string;

    constructor(codigo: string, nombreProducto: string, stock: number, precio: number, unidad: string,  imagen: string, descripcion:string) {
        this.codigo = codigo;
        this.nombreProducto = nombreProducto;
        this.stock = stock;
        this.precio = precio;
        this.unidad = unidad;
        this.imagen = imagen;
        this.descripcion = descripcion;
    }
}