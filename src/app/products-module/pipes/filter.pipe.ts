import { Pipe, PipeTransform } from '@angular/core';
import { ProductModel } from '../models/product.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, buscado:string, opcion: number): ProductModel[] {

    if(buscado.length < 2 ) {
      return value;
    }
    
    const resultados = [];
    const opciones:string[] = ['name', 'country'];
    
    for(const elem of value){
      if( elem[opciones[opcion]].toLowerCase().indexOf(buscado.toLowerCase()) > -1 ) {
        resultados.push( elem );
      }
    }

    return resultados;
  }

}
