import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import {AuthService} from '../../services/AuthService/auth.service';
import * as $ from 'jquery'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
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

  constructor(private auth: AuthService) { 
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
  }

  login( form: NgForm ) {

    if (  form.invalid ) { return; }
    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.login( this.usuario )
      .subscribe( resp => {
        console.log(resp);

        Swal.close();
        localStorage.setItem('email', this.usuario.email);
        this.status=true;
        this.nombreUsuario = localStorage.getItem('usuario');
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Bienvenido: '+ localStorage.getItem('usuario') ,
          showConfirmButton: false,
          timer: 1500
        })
      }, (err) => {
        console.log(err.error.message[0].messages[0].message);
        Swal.fire({
          title: 'Usuario y/o Contraseña incorrectos',
          text: err.error.error.message,
          icon: 'error'
        });
      });

  }


  public handleAddressChange(address: any) {
   this.formattedAddress= address.formattedAddress;
}
}
