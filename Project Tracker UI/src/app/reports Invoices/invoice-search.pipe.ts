import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'invoiceSearch'
})
export class InvoiceSearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val:any) => {
      let rVal = (val.invoiceNumber.toLocaleLowerCase().includes(args)) || (val.invoiceNumber.toLocaleLowerCase().includes(args));
      return rVal;
    })

  }
}

