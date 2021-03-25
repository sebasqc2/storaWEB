import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import {AuthService} from '../../services/AuthService/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: UsuarioModel = new UsuarioModel();
  status: boolean = false;
  nombreUsuario: string ="";
  constructor(private auth: AuthService) { 

  }

  ngOnInit(): void {
  }

  login( form: NgForm ) {
    console.log(form);
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
}
