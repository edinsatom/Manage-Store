import { Pipe, PipeTransform } from '@angular/core';
import { ProductModel } from '../models/product.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, searching:string, option: number): ProductModel[] {
    
    if(searching.length < 2 ) {
      return value;
    }
    
    const resp = [];
    const filterOptions:string[] = ['name', 'country'];
    
    for(const elem of value){
      if( elem[filterOptions[option]].toLowerCase().indexOf(searching.toLowerCase()) > -1 ) {
        resp.push( elem );
      }
    }

    return resp;
  }

}
