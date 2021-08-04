import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import {AuthService} from '../../services/AuthService/auth.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output("closeLoginModal") closeLoginModal: EventEmitter<any> = new EventEmitter();
  usuario: UsuarioModel = new UsuarioModel();
  status: boolean = false;
  nombreUsuario: string ="";
  constructor(private auth: AuthService, private router: Router) { 

  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => { 
      return false }
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
        this.closeLoginModal.emit();
        this.router.navigateByUrl("/landing")

      }, (err) => {
        Swal.fire({
          title: 'Usuario y/o Contraseña incorrectos',
          text: err.error.error.message,
          icon: 'error'
        });
      });

  }
}
