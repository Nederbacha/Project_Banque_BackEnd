import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'simpleFormaDate'
})
export class SimpleFormaDatePipe implements PipeTransform {

  transform(value: Date): string {
    const date = new Date(value); // Convertir la chaîne ISO en objet Date
    const day = ('0' + date.getDate()).slice(-2); // Obtenir le jour
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Obtenir le mois
    const year = date.getFullYear(); // Obtenir l'année
    return `${day}/${month}/${year}`; // Retourner sous le format 'dd/MM/yyyy'
  }

}
