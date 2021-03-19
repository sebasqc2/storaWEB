
export class grupoTienda{
    private id_grupo_tienda:string;
    private nombre:string;
    private icono:string;

    constructor() {
        this.id_grupo_tienda="";
        this.nombre="";
        this.icono="";
    }

    public getNombre(){
        return this.nombre;
    }

    public getIcono(){
        return this.icono;
    }
    
}