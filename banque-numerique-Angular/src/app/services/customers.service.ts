import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Observable} from "rxjs";
import {Customer} from "../model/customer.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

   customers : any ;
  constructor(private http : HttpClient) {

  }


  public getCustomers() : Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(environment.backEndHost+"/customres/customers") ;
  }



  public getCustomersByName(name : string):Observable<Array<Customer>>{
    return  this.http.get<Array<Customer>>(environment.backEndHost+"/customres/customersBy/" +name) ;
  }

  public addCustomerNew(customer : Customer):Observable<Customer>{
return  this.http.post<Customer>(environment.backEndHost+"/customres/add",customer);
  }

 public deleteCustomer(id : number){

    return this.http.delete(environment.backEndHost+"/customres/delete/"+id);
 }

}
