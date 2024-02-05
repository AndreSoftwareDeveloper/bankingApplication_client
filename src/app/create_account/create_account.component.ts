import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IonicModule, NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NaturalPerson } from '../NaturalPerson';

@Component({
  standalone: true, //redundant?
  imports: [IonicModule, FormsModule],
  selector: 'create_account',
  templateUrl: './create_account.component.html',
  styleUrls: ['./create_account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  responseData: any;
  errorString: string | undefined;
  signUpForm: any;
  naturalPerson: NaturalPerson | undefined;

  constructor(private apiService: ApiService, private navCtrl: NavController) {
    this.signUpForm = {
      firstName: '',
      lastName: '',
      birthDate:
      {
        year: null,
        month: null,
        day: null
      },
      birthPlace: '',
      address: '',
      pesel: '',
      idCardNumber: '',
      phoneNumber: '',
      email: '',
      customerType: 'indywidualny'
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
    if (!this.signUpForm.firstName ||
      !this.signUpForm.lastName ||
      !this.signUpForm.birthDate ||
      !this.signUpForm.birthPlace ||
      !this.signUpForm.address ||
      !this.signUpForm.pesel ||
      !this.signUpForm.idCardNumber ||
      !this.signUpForm.phoneNumber ||
      !this.signUpForm.email) {
        alert("Fill all required fields.")
        return;
      }
        
    const birthDate = new Date(this.signUpForm.birthDate);
    const minDate = new Date('1910-01-01');
    const maxDate = new Date();

    if (birthDate < minDate || birthDate > maxDate) {
      alert('Enter a valid birthdate.');
      return;
    }

    const pesel = parseInt(this.signUpForm.pesel, 10);
    const minPesel = parseInt('0001012341', 10);
    if (pesel < minPesel) {
      alert("Enter a valid PESEL.");
      return;
    }

    const data = {
      "firstName": this.signUpForm.firstName,
      "lastName": this.signUpForm.lastName,
      "birthDate": 
      {
        "year": birthDate.getFullYear(),
        "month": birthDate.getMonth() + 1,
        "day": birthDate.getDate()
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
      () => {
        alert("Account has been successfully created. Follow instructions in email.")
      },
      () => { }
    );    
  }

  onCustomerTypeChange() {
    if (this.signUpForm.customerType === 'firma') {
      window.location.href = 'https://www.google.com';
    }
  }

}
