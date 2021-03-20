import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public locationFormGroup: FormGroup;
  public formattedAddress ='';
  public direccion: string;

  public options={
    componentRestrictions:{
      country:['CO']
    }
  }

  constructor() { 
    this.direccion="";
  }

  ngOnInit(): void {
    this.locationFormGroup = new FormGroup({
      address: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  public handleAddressChange(address: any) {
   this.formattedAddress= address.formattedAddress;
}
}
