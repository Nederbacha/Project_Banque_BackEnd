import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomersService} from "../services/customers.service";
import {Customer} from "../model/customer.model";
import {Router} from "@angular/router";


@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent implements  OnInit {

  addCustomerFormGroup! : FormGroup ;

  constructor(private customService : CustomersService ,
              private fb : FormBuilder ,
              private router : Router) {


  }
    ngOnInit(): void {

    this.addCustomerFormGroup=this.fb.group(
      {
        name :this.fb.control("",[Validators.required ]),
        email : this.fb.control("",[Validators.email , Validators.required])
      }
    )

    }


  addCostomer() {

    let customerNew:Customer = this.addCustomerFormGroup.value;
    this.customService.addCustomerNew(customerNew).subscribe({
      next : data =>{
        alert("Customer is add");
     //   this.addCustomerFormGroup.reset();
        this.router.navigateByUrl("customers");
      },error : err => {
        console.log("Erreur d'insertion");
      }
    })
  }

  protected readonly require = require;
}
