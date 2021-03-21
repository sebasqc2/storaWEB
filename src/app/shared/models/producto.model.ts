export class Producto {

    public codigo: string;
    public nombreProducto: string;
    public stock: number;
    public precio: number;
    public estado: boolean;
    public imagen: string;

    constructor(codigo: string, nombreProducto: string, stock: number, precio: number, estado: boolean, imagen: string) {
        this.codigo = codigo;
        this.nombreProducto = nombreProducto;
        this.stock = stock;
        this.precio = precio;
        this.estado = estado;
        this.imagen = imagen;
    }
}