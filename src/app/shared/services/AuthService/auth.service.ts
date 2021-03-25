import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../../models/usuario.model';
import { RegistroModel} from '../../models/registro.model';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'sportbackend-heroku.herokuapp.com/auth/local';
  private serverURL = environment.serverUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient ) {
    this.logout();
   }


  // tslint:disable-next-line: typedef
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('usuario');
    localStorage.removeItem('usuario');

  }

  // tslint:disable-next-line: typedef
  login( usuario: UsuarioModel ) {
    const authData = {
      identifier: usuario.email,
      password: usuario.password
    };

    return this.http.post(
      `${ this.serverURL}auth/local`, authData, this.httpOptions
    ).pipe(
      map(resp => {
        // tslint:disable-next-line: no-string-literal
        this.guardarDatos( resp['jwt'], resp['user'].username , resp['user'].role.name);
        return resp;
      })
    );
  }
  
  register( registro: RegistroModel ) {
    const rolUsuario = {
      id: 4,
      name: "Usuario",
      description: "rol del usuario generico sin tiendas",
      type: "usuario"
    }
    const rolTendero = {
      id: 3,
      name: "Tendero",
      description: "rol para el tendero",
      type: "tendero"
    }
    const authData = {
      username:registro.name,
      email:registro.email,
      provider:'local',
      confirmed: true,
      blocked: false,
      nombre: registro.name,
      nacimiento:registro.birthday,
      direccion:registro.address,
      telefono:registro.phone,
      password: registro.password,
      role:{}
    };
    if (registro.role==="usuario") {
      authData.role=rolUsuario;
    }
    if (registro.role==="tendero") {
      authData.role=rolTendero;
    }
    console.log(authData);

    return this.http.post(
      `${ this.serverURL}users`, authData, this.httpOptions
    ).pipe(
      map(resp => {
        // tslint:disable-next-line: no-string-literal
        console.log(resp);
        
        //this.guardarDatos( resp['jwt'], resp['user'].username , resp['user'].role.name);
        return resp;
      })
    );
  }

  // tslint:disable-next-line: typedef
  private guardarDatos(token: string, username: string, role: string){
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', username);
    localStorage.setItem('rol', role);

  }



  // tslint:disable-next-line: typedef
  buildHeaders1() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  isAuth(): boolean{
    if (localStorage.getItem('token')) {
      return true;
    }else{
      return false;
    }
  }

}

