import {Pipe, PipeTransform} from "@angular/core";

@Pipe({

  name: 'NumberForma'
})


export  class numberFormaPipe implements PipeTransform{
    transform(value : number):string {
return value.toFixed(2);
    }


}
