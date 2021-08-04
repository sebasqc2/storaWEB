export class Pedido {


    public codigo : number;
    public fecha: string;
    public valoracion: number;
    public users_permissions_user: string;
    public productos: [];
    public cantidades: {};
    public total: number;
    public estado: string;

    constructor(codigo: number, fecha: string, valoracion: number, users_permissions_user: string, productos: [], cantidades: {}, total: number, estado: string) {
        this.codigo = codigo
        this.fecha = fecha;
        this.valoracion = valoracion;
        this.users_permissions_user = users_permissions_user;
        this.productos = productos;
        this.cantidades = cantidades;
        this.total = total;
        this.estado = estado;
    }
}