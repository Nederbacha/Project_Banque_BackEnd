import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormaApresVergPipe'
})
export class NumberFormaApresVergPipePipe implements PipeTransform {

  transform(value: number): string {
    return value.toFixed(3);
  }

}
