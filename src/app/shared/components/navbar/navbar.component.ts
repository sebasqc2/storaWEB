import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { RegistroModel } from "../../models/registro.model";
import {AuthService} from '../../services/AuthService/auth.service';
import { TiendaService } from '../../services/ver-lista-negocios/tienda.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [TiendaService]
})
export class NavbarComponent implements OnInit {

  
  
  status: boolean = false;
  nombreUsuario: string ="";
  public locationFormGroup: FormGroup;
  public formattedAddress ='';
  public dirEntada:string;


  @Output() envioDireccion: EventEmitter<string> = new EventEmitter<string>();
  

  public options={
    componentRestrictions:{
      country:['CO']
    }
  }

  constructor(public tiendaSvc: TiendaService) { 
    this.envioDireccion.emit("  ");
    this.dirEntada="";
  }

  ngOnInit(): void {

    this.locationFormGroup = new FormGroup({
      address: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  cambioDireccion(direccion:string):void{
    this.envioDireccion.emit(direccion);
    this.dirEntada=direccion;
  }

  cargarDireccion():void{
      Swal.fire(
        'Ventana',
        ' Establecimientos comerciales!',
        'success'
      )
      //this.tiendaSvc.direccion = this.dirEntada
      this.tiendaSvc.setDireccion(this.dirEntada)
  }

  
 


  public handleAddressChange(address: any) {
   this.formattedAddress= address.formattedAddress;
}
}
