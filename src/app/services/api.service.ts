import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, switchMap, throwError } from 'rxjs';

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

  findCustomerNumber(customerNumber: number): Observable<any> {
    const response_naturalPerson = this.http.get(this.endpoint_naturalPerson + "/customerNumber/" + customerNumber);

    return this.checkResponseCode(response_naturalPerson).pipe(
      switchMap((responseCode: number) => {
        if (responseCode === 200)
          return response_naturalPerson;
        else
          return this.http.get(this.endpoint_juridicalPerson + "/customerNumber/" + customerNumber);        
      })
    );
  }

  checkResponseCode(response: Observable<any>): Observable<number> {
    return response.pipe(
      map(() => 200),
      catchError(() => of(404))
    );
  }

  postNaturalPerson(formData: object) {
    return this.http.post(this.endpoint_naturalPerson, formData).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        if (error.error === 'phone')
          alert('Enter a valid phone number.')
        else if (error.error === 'email')
          alert('Enter a valid phone email.')        
        else if (error.error === 'idCard')
          alert('Enter a valid phone ID card number.')        
        else if (error.error === 'pesel')
          alert('Enter a valid PESEL.')
        return error;
      })
    );
  }

  postJuridicalPerson(formData: object, headers: HttpHeaders) {
    return this.http.post('https://localhost:7045/api/JuridicalPerson', formData, {
      headers: headers
    }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        return throwError(error);
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

  appendToTransactionsHistory(transaction: any) {
    const endpoint = 'https://localhost:7045/api/Account';    
    return this.http.put(endpoint, transaction);
  }
}
