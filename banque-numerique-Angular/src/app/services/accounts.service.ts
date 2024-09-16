import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccountDetails} from "../model/account.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http :HttpClient) {

  }
  public getAccount(idAccount : string , page : number , size : number):Observable<AccountDetails>{
    return this.http.get<AccountDetails>(environment.backEndHost+"/accounts/"+idAccount+"/pageOperations?page="+page+"&size="+size);

  }

  public  debit(accountID : string ,amount : number , description : string){
let data ={accountID,amount,description};
return this.http.post(environment.backEndHost+"/accounts/debit/",data)
  }

  public  credit(accountID : string ,amount : number , description : string){
    let data ={accountID,amount,description};
    return this.http.post(environment.backEndHost+"/accounts/credit/",data)
  }




  public  transfer(accountSource : string ,accountDestination : string ,amount : number , description : string){
    let data ={accountSource,accountDestination,amount,description};
    return this.http.post(environment.backEndHost+"/accounts/transfer/",data)
  }



}
