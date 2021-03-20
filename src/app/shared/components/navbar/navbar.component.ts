import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public locationFormGroup: FormGroup;
  public formattedAddress ='';
  public dirEntada:string;

  @Output() envioDireccion: EventEmitter<string> = new EventEmitter<string>();
  

  public options={
    componentRestrictions:{
      country:['CO']
    }
  }

  constructor() { 
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


  public handleAddressChange(address: any) {
   this.formattedAddress= address.formattedAddress;
}
}
