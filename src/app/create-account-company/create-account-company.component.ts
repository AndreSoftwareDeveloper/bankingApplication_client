import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-account-company',
  templateUrl: './create-account-company.component.html',
  styleUrls: ['./create-account-company.component.scss'],
})
export class CreateAccountCompanyComponent implements OnInit {
  signUpForm: any;

  constructor() {
    this.signUpForm =
    {
      companyName: '',
      nip: '',
      regon: '',
      companyAddress: '',
      correspondenceAddress: '',
      phone: null,
      email: '',
      krsCopy: '',
      companyAgreement: '',
      representativeFirstName: '',
      representativeLastName: '',
      representativeBirthDate: null,
      representativeBirthPlace: '',
      representativeAddress: '',
      representativePesel: '',
      representativePhone: null,
      representativeEmail: '',
      representativeIdNumber: '',
      representativeIdScan: '',
      customerType: 'firma'
    };
  }

  ngOnInit(): void { }

  onCustomerTypeChange() {
    throw new Error('Method not implemented.');
  }

  submitForm() {
    throw new Error('Method not implemented.');
  }

}  
