import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Customer } from '../models/Customer';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private endpoint_naturalPerson = 'https://localhost:7045/api/NaturalPerson';
  private endpoint_juridicalPerson = 'https://localhost:7045/api/JuridicalPerson';
  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(this.endpoint_naturalPerson);
  }

  findCustomerNumber(customerNumber: number): Observable<Customer> {
    const response_naturalPerson = this.http.get<Customer>(this.endpoint_naturalPerson + "/customerNumber/" + customerNumber);

    return this.checkNaturalPersonResponseCode(response_naturalPerson).pipe(
      switchMap((responseCode: number) => {
        if (responseCode === 200)
          return response_naturalPerson;
        else
          return this.http.get<Customer>(this.endpoint_juridicalPerson + "/customerNumber/" + customerNumber);        
      })
    );
  }

  checkNaturalPersonResponseCode(response: Observable<Customer>): Observable<number> {
    return response.pipe(
      map(() => 200),
      catchError(() => of(404))
    );
  }

  postNaturalPerson(formData: FormData) {
    let errorMessage: string = "Internal server error.";
    return this.http.post(this.endpoint_naturalPerson, formData).pipe(
      map((response) => {
        return response;
      }),
      catchError((httpError) => {
        if (httpError.error === 'phone')
          errorMessage = 'This phone number already exists.';

        else if (httpError.error === 'email')
          errorMessage = 'This email already exists.';

        else if (httpError.error === 'idCard')
          errorMessage = 'This ID card number already exists.';

        else if (httpError.error === 'pesel')
          errorMessage = 'This PESEL already exists.'

        return throwError(errorMessage);
      })
    );
  }

  postJuridicalPerson(formData: FormData): Observable<any> {
    let errorMessage: string = "Internal server error.";
    return this.http.post('https://localhost:7045/api/JuridicalPerson', formData).pipe(
      map((response) => {
        return response;
      }),
      catchError((httpError) => {
        if (httpError.error === 'email')
          errorMessage = 'This email is already being used.';
        else if (httpError.error === 'companyName')
          errorMessage = 'This company name already exists.';
        else if (httpError.error === 'phone')
          errorMessage = 'This phone number is already being used.';
        else if (httpError.error === 'regon')
          errorMessage = 'Account with this REGON already exists.';
        else if (httpError.error === 'nip')
          errorMessage = 'Account with this NIP already exists.';

        return throwError(errorMessage);
      })
    );
  }

  patchData(verificationToken: number, newPassword: string, nip: number, regon: number) {
    const updateData = {
      verificationToken: verificationToken,
      newPassword: newPassword,
      nip: +nip,
      regon: +regon
    };

    return this.http.patch(this.endpoint_naturalPerson, updateData, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  appendToTransactionsHistory(transaction: FormData) {
    const endpoint = 'https://localhost:7045/api/Account';    
    return this.http.put(endpoint, transaction);
  }
}
