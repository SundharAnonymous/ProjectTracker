import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pOSearch'
})
export class POSearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val:any) => {
      let rVal = (val.ltipoNumber.toLocaleLowerCase().includes(args)) || (val.ltipoNumber.toLocaleLowerCase().includes(args));
      return rVal;
    })

  }
}
