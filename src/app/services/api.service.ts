import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private endpoint = 'https://localhost:7045/api/NaturalPerson';

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(this.endpoint);
  }

  findCustomerNumber(customerNumber: number) {
    return this.http.get(this.endpoint + "/customerNumber/" + customerNumber);
  }

  postData(data: any) {
    return this.http.post(this.endpoint, data).pipe(
      map((response) => {
        console.log(response)
        return response;
      }),
      catchError((error) => {

        if (error.error === 'phone')
          alert('Enter a valid phone number.')
        else if (error.error === 'email') {
          alert('Enter a valid phone email.')
        }
        else if (error.error === 'idCard') {
          alert('Enter a valid phone ID card number.')
        }
        else if (error.error === 'pesel') {
          alert('Enter a valid PESEL.')
        }

        console.log(error);
        return error;
      })
    );
  }

  postJuridicalPersonData(formData: any, headers: HttpHeaders) {
    return this.http.post('https://localhost:7045/api/JuridicalPerson', formData, { headers: headers }).pipe(
      map((response) => {
        console.log(response)
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

    return this.http.patch(this.endpoint, updateData, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
