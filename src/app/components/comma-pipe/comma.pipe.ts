import { Pipe, PipeTransform } from '@angular/core';

/**
 * take an array of strings and produce a comma separated list suitable for breaks
 * in html
 * ["alpha","beta","gamma"] becomes "alpha, beta, gamma"
 */
@Pipe({
  name: 'commaPipe'
})
export class CommaPipe implements PipeTransform {

  transform(inputArray: string[], args?: any): any {
    let out = '';
    inputArray.forEach(s => {

      out = out + s + ', ';
    });
    out = out.trim();
    out = out.substr(0, out.length - 1);
    return out;
  }

}



