import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NaturalPerson } from '../NaturalPerson';
import { DatePipe } from '@angular/common';

interface SignUpForm {
  firstName: string;
  lastName: string;
  birthDate: Date | null;
  birthPlace: string;
  address: string;
  pesel: string;
  idCardNumber: string;
  phoneNumber: string;
  email: string;
  customerType: string;
}

@Component({
  selector: 'create_account',
  templateUrl: './create_account.component.html',
  styleUrls: ['./create_account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  responseData: string | undefined;
  errorString: string | undefined;
  signUpForm: SignUpForm;
  naturalPerson: NaturalPerson | undefined;

  constructor(private apiService: ApiService, private datePipe: DatePipe) {
    this.signUpForm = {
      firstName: '',
      lastName: '',
      birthDate: null,
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

    let formData = new FormData();
    formData.append('firstName', this.signUpForm.firstName);
    formData.append('lastName', this.signUpForm.lastName);
    formData.append('birthDate', this.datePipe.transform(this.signUpForm.birthDate, 'yyyy-MM-dd')!);
    formData.append('birthPlace', this.signUpForm.birthPlace);
    formData.append('address', this.signUpForm.address);
    formData.append('pesel', this.signUpForm.pesel);
    formData.append('idCardNumber', this.signUpForm.idCardNumber);
    formData.append('phoneNumber', this.signUpForm.phoneNumber);
    formData.append('email', this.signUpForm.email);
    formData.append('password', 'temporary_password');

    this.apiService.postNaturalPerson(formData).subscribe(
      () => {
        alert("Account has been successfully created. Follow instructions in email.")
      },
      (error) => {
        alert("An error occured while creating an account:\n" + JSON.stringify(error));
      }
    );
  }

  onCustomerTypeChange() {
    if (this.signUpForm.customerType === 'firma')
      window.location.href = 'create_account_company';    
  }
}
