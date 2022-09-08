import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  url = 'http://api.worldbank.org/v2/country?format=json&per_page=299'

  constructor( private http:HttpClient) { }

  obtenerPaises(){

    return this.http.get( `${this.url}` )
      .pipe(
        map( (resp:any) => this.generarArreglo( resp[1] ) )
      );
  }

  private generarArreglo( resp:any ){

    let paises:string[] = [];    

    for (const name in resp) {
      if (resp.hasOwnProperty(name)) {
        paises.push(resp[name].name);        
      }
    }

    return paises;
  }
}
