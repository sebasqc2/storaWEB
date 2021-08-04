import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { RegistroModel } from "../../models/registro.model";
import {AuthService} from '../../services/AuthService/auth.service';
import { TiendaService } from '../../services/ver-lista-negocios/tienda.service';
import { Location } from '@angular/common'
import { Router } from '@angular/router'
declare var $ : any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [TiendaService]
})
export class NavbarComponent implements OnInit {

  
  isLogged: boolean ;
  nombreUsuario: string;
  isUser:boolean = true;
  isTendero:boolean = false;
  rol:string;
  public locationFormGroup: FormGroup;
  public formattedAddress ='';
  public dirEntada:string;

  public ruta: string = "/ver_lista_negocios"
  cont: number
  @Output() envioDireccion: EventEmitter<string> = new EventEmitter<string>();
  
  public options={
    componentRestrictions:{
      country:['CO']
    }
  }
  
  constructor(private auth: AuthService, private location: Location, private router: Router, public tiendaSvc: TiendaService) { 
    this.envioDireccion.emit("  ");
    this.dirEntada="";
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => { 
      return false }
    this.locationFormGroup = new FormGroup({
      address: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  cambioDireccion(direccion:string):void{
    this.envioDireccion.emit(direccion);
    this.dirEntada=direccion;

    this.tiendaSvc.setDireccion(direccion.replace(/ /g, ""))
    this.tiendaSvc.setCategoria("Todas")
  }

  cargarDireccion():void{
      /* Swal.fire(
        'Ventana',
        ' Establecimientos comerciales!',
        'success'
      ) */
      //this.tiendaSvc.direccion = this.dirEntada
      console.log(this.tiendaSvc.getDireccion())
      //this.ruta = "**"
      //this.ruta = "/ver_lista_negocios"
      /* if(this.cont > 1){
        location.reload()
      }else{
        this.cont++
      } */
  }

  public onChangeURL(): void{
    this.location.replaceState("/ver_lista_negocios")
  }

  public onReloadURL(): void{
    this.router.navigateByUrl("/ver_lista_negocios")
  }
 
  public closeShoppingModal():void{
    $("#shoppingCar").removeClass("in");
    $(".modal-backdrop").remove();
    $("#shoppingCar").hide();
  }

  public closeRegisterModal():void{
    $("#signupPage").removeClass("in");
    $(".modal-backdrop").remove();
    $("#signupPage").hide();
  }

  public closeLoginModal():void{
    this.isLogged = this.auth.isAuth();
    if (this.isLogged) {
      this.nombreUsuario = localStorage.getItem("usuario");
      if (localStorage.getItem("rol")) {
        this.rol = localStorage.getItem("rol");
        if(this.rol==="Usuario"){
          this.isUser=true
          this.isTendero=false
        }else{
          this.isUser=false
          this.isTendero=true
        }
      }            
    }
    $("#signinPage").removeClass("in");
    $(".modal-backdrop").remove();
    $("#signinPage").hide();
  }

  

  public handleAddressChange(address: any) {
   this.formattedAddress= address.formattedAddress;
}
}
