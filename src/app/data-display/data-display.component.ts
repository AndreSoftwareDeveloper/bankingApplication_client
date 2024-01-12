import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NaturalPerson } from '../NaturalPerson';

@Component({
  standalone: true,
  imports: [IonicModule, FormsModule],
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.scss'],
})
export class DataDisplayComponent  implements OnInit {
  responseData: any = "debug";
  errorString: string | undefined;
  signUpForm: any;
  naturalPerson: NaturalPerson | undefined;

  constructor(private apiService: ApiService) {
    this.signUpForm = {
      firstName: '',
      lastName: '',
      birthDate: '',
      birthPlace: '',
      address: '',
      pesel: '',
      idCardNumber: ''
    };
  }
  ngOnInit(): void { }

  fetchData(): void {
    this.apiService.getData().subscribe(
      (data) => {
        this.responseData = JSON.stringify(data, null, 2);
        this.errorString = undefined; // resetting the error message
      },
      (error) => {
        this.responseData = undefined;
        this.errorString = "Error while fetching data: " + error.message;
      }
    );
  }

  submitForm() {

    const data = {
      "firstName": this.signUpForm.firstName,
      "lastName": this.signUpForm.lastName,
      "birthDate":
      {
        "year": 2023,
        "month": 12,
        "day": 1,
        "dayOfWeek": 1
      },
      "birthPlace": this.signUpForm.birthPlace,
      "address": this.signUpForm.address,
      "pesel": this.signUpForm.pesel,
      "idCardNumber": this.signUpForm.idCardNumber,
      "phoneNumber": this.signUpForm.phoneNumber,
      "email": this.signUpForm.email,
      "password": "temporary_password"
    };
    
    this.apiService.postData(data).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.error(error);
      }
    );    
  }
}
