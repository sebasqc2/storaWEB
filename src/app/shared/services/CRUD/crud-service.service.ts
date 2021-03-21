import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class CrudServiceService {
  private serverURL = environment.serverUrl;
  private local: string = localStorage.getItem('token');

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // tslint:disable-next-line: quotemark
      // tslint:disable-next-line: object-literal-key-quotes
      "Authorization":  `Bearer ${this.local}`
    })
  };

  constructor(private http: HttpClient) {}

  // tslint:disable-next-line: typedef
  buildHeaders() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // tslint:disable-next-line: quotemark
        // tslint:disable-next-line: object-literal-key-quotes
        "Authorization": `Bearer ${this.local}`
      })
    };
  }


  public createModelWA(path, model): Observable<any> {
    return this.http.post<any>(`${this.serverURL}${path}`, model, {});
  }

  public getModelWA(path): Observable<any> {
    return this.http.get<any>(`${this.serverURL}${path}`, {});
  }

  public createModel(path, model): Observable<any> {
    return this.http.post<any>(`${this.serverURL}${path}`, model, this.httpOptions);
  }

  public createModelParams(path, model, params): Observable<any> {
    // tslint:disable-next-line: object-literal-shorthand
    return this.http.post<any>(`${this.serverURL}${path}`, model, { headers: this.httpOptions.headers, params: params });
  }

  public putModelParams(path, model, params): Observable<any> {
    // tslint:disable-next-line: object-literal-shorthand
    return this.http.put<any>(`${this.serverURL}${path}`, model, { headers: this.httpOptions.headers, params: params });
  }

  public putModel(path, model): Observable<any> {
    return this.http.put<any>(`${this.serverURL}${path}`, model, { headers: this.httpOptions.headers });
  }

  public getModel(path): Observable<any> {
    this.buildHeaders();
    return this.http.get<any>(`${this.serverURL}${path}`, this.httpOptions);
  }
  public getModelModel(path, model): Observable<any> {
    return this.http.post<any>(`${this.serverURL}${path}`, model, { headers: this.httpOptions.headers });
  }

  public deleteModel(path): Observable<any> {
    return this.http.delete<any>(`${this.serverURL}${path}`, this.httpOptions);
  }

  public deleteModelWA(path): Observable<any> {
    return this.http.delete<any>(`${this.serverURL}${path}`, {});
  }

}
