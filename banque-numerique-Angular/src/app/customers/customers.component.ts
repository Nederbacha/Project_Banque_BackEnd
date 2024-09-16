import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomersService} from "../services/customers.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {Customer} from "../model/customer.model";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{


  // le besoind c'est que  enveut envoyer la liste des client au backEnd et en en veut afficher

  customers! : Observable<Array<Customer>> ;
 errorMessage! :Object ;
  searchCustomerForm! :FormGroup ;
 keyWordInput! : string ;

  constructor(private customService : CustomersService,
              private fb :FormBuilder) {
  }
    ngOnInit(): void {

    this.searchCustomerForm=this.fb.group({
      keyWordInput:this.fb.control("")
    })

  this.customers=  this.customService.getCustomers().pipe(
    catchError(err => {
      this.errorMessage=err.message  ;
      return throwError(err);
    })
  )




    }


  hendlSearchCustomer() {

    let kw=this.searchCustomerForm.value.keyWordInput ;
    this.customers=this.customService.getCustomersByName(kw).pipe(
      catchError(err => {
        this.errorMessage=err.message ;
        return throwError(err);
      })
    )

  }

  deleteCustomer(custo  : Customer) {

    let conf=confirm("are you sur de deleting the customer ?")
if(!conf) return ;
this.customService.deleteCustomer(custo.id).subscribe({
  next : data => {

    this.customers=this.customers.pipe(
      map(data =>{
        let index = data.indexOf(custo);
        data.slice(index ,1)
        return data;
      })
    )

//this.hendlSearchCustomer();
  },error : err => {
    alert("customer not deleted");
  }
})
  }
}
