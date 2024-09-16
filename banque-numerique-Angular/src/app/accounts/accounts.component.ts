import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountsService} from "../services/accounts.service";
import {Observable} from "rxjs";
import {AccountDetails} from "../model/account.model";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements  OnInit{

  accountFormGroup! : FormGroup ;
  currentPage  : number=0 ;
  sizePage  : number =2 ;
  accountObservable! : Observable<AccountDetails>


  operationFormGroup! : FormGroup ;


  constructor(private fb : FormBuilder ,
              private accountService : AccountsService) {
  }

  ngOnInit(): void {
    this.accountFormGroup=this.fb.group({
      accountId :this.fb.control("")
    });

    this.operationFormGroup=this.fb.group({

      typeOperation :this.fb.control(""),
      amount : this.fb.control(0),
      description : this.fb.control(null),
      accountDestination : this.fb.control(null)

    })


    }

  handelAccount() {

    let idAccount=this.accountFormGroup.value.accountId;

  this.accountObservable=  this.accountService.getAccount(idAccount,this.currentPage , this.sizePage);

  }

  gotoPage(page: number) {
    this.currentPage=page ;
    this.handelAccount();
  }

  clickOperation() {

let idAccount : string =this.accountFormGroup.value.accountId ;
if(this.operationFormGroup.value.typeOperation=='DEBIT'){

  this.accountService.debit('2e460549-cf75-467e-89e2-8ff07787eb58',100 , 'test_Description').subscribe({
    next :data =>{
      alert("DEBIT SUCCES");
      this.handelAccount();
    },error : err => {
      console.log(err);
    }
  })

}else if(this.operationFormGroup.value.typeOperation=='CREDIT'){
  //accountID : string ,amount : number , description : string
  this.accountService.credit(idAccount,this.operationFormGroup.value.amount , this.operationFormGroup.value.description).subscribe({
    next :data =>{
      alert("CREDIT SUCCES");
      this.handelAccount();
    },error : err => {
      console.log(err);
    }
  })
}else if(this.operationFormGroup.value.typeOperation=='TRANSFER'){
  //accountSource,accountDestination,amount,description
  this.accountService.transfer(idAccount,this.operationFormGroup.value.accountDestination,this.operationFormGroup.value.amount,this.operationFormGroup.value.description).subscribe({
    next :data =>{
      alert("TRANSFER SUCCES");
      this.handelAccount();
    },error : err => {
      console.log(err);
    }
  })
}
  }
}
