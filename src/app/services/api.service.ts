import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private endpoint = 'https://localhost:7045/api/NaturalPerson';

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(this.endpoint);
  }

  postData(data: any) {
    return this.http.post(this.endpoint, data).pipe(
      map((response) => {
        console.log(response);
        return 'Udało się wysłać żądanie POST!';
      }),
      catchError((error) => {
        console.log(error);
        return 'Wystąpił błąd podczas wysyłania żądania POST';
      })
    );
  }

  putData(verificationToken: number, newPassword: string, nip: number, regon: number) {
    const requestData = {
      verificationToken: verificationToken,
      newPassword: newPassword,
      nip: +nip,
      regon: +regon
    };
    return this.http.put(this.endpoint, requestData, {
      headers: { 'Content-Type': 'application/json' }
    });
  }



}
