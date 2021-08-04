import { Component, OnInit } from '@angular/core';
import { RegistroModel} from '../../models/registro.model';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import {AuthService} from '../../services/AuthService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registro: RegistroModel = new RegistroModel();
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => { 
      return false }
  }

  register( form: NgForm ) {
    console.log(form);
    if (  form.invalid ) { return; }
    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.register( this.registro )
      .subscribe( resp => {
        console.log(resp);

        Swal.close();
        
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registrado con exito ' ,
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("/landing")
      }, (err) => {
        console.log(err.error.message[0].messages[0].message);
        Swal.fire({
          title: 'Hubo un error intente mas tarde',
          text: err.error.error.message,
          icon: 'error'
        });
      });

  }
}
