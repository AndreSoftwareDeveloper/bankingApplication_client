import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-account-company',
  templateUrl: './create-account-company.component.html',
  styleUrls: ['./create-account-company.component.scss'],
})
export class CreateAccountCompanyComponent implements OnInit {
  signUpForm: any;

  constructor(private apiService: ApiService) {
    this.signUpForm =
    {
      companyName: '',
      companyAddress: '',
      correspondenceAddress: '',
      nip: '',
      regon: '',      
      phone: null,
      email: '',
      krsCopy: File,
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
      customerType: 'company'
    };
  }

  ngOnInit(): void { }

  onCustomerTypeChange() {
    if (this.signUpForm.customerType === 'individual')
      window.location.href = 'create_account';
  }

  entryKRS: number[] = [];
  companyAgreement: number[] = [];
  representativeIdScan: number[] = [];

  async onFileChange(event: Event, fieldName: string) {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      const file = input.files[0] as File;
      try {
        const fileAsByteArray = await this.readFileAsByteArray(file);

        switch (fieldName) {
          case 'entryKRS':
            this.entryKRS = fileAsByteArray;
            break;

          case 'companyAgreement':
            this.companyAgreement = fileAsByteArray;
            break;

          case 'representativeIdScan':
            this.representativeIdScan = fileAsByteArray;
            break;
        }
      } catch (error) {
        console.error('Error while reading the file:', error);
      }
    }
  }

  readFileAsByteArray(file: File): Promise<number[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          const arrayBuffer = event.target.result as ArrayBuffer;
          const uintArray = new Uint8Array(arrayBuffer);
          const byteArray: number[] = [];

          uintArray.forEach((value) => {
            byteArray.push(value);
          });

          resolve(byteArray);
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    });
  }

  submitForm() {
    if (!this.signUpForm.companyName ||
      !this.signUpForm.companyAddress ||
      !this.signUpForm.correspondenceAddress ||
      !this.signUpForm.nip ||
      !this.signUpForm.regon ||
      !this.signUpForm.phone ||
      !this.signUpForm.email ||
      !this.signUpForm.representativeFirstName ||
      !this.signUpForm.representativeLastName ||
      !this.signUpForm.representativeBirthDate ||
      !this.signUpForm.representativeBirthPlace ||
      !this.signUpForm.representativeAddress ||
      !this.signUpForm.representativePesel ||
      !this.signUpForm.representativePhone ||
      !this.signUpForm.representativeEmail ||
      !this.signUpForm.representativeIdNumber) {
      alert("Fill all required fields.")
      return;
    }

    let formData = new FormData();
    formData.append('companyName', this.signUpForm.companyName);
    formData.append('companyAddress', this.signUpForm.companyAddress);
    formData.append('correspondenceAddress', this.signUpForm.correspondenceAddress);
    formData.append('nip', this.signUpForm.nip);
    formData.append('regon', this.signUpForm.regon);
    formData.append('phone', this.signUpForm.phone);
    formData.append('email', this.signUpForm.email);
    formData.append('entryKRS', new Blob([new Uint8Array(this.entryKRS)], { type: 'application/octet-stream' }));
    formData.append('companyAgreement', new Blob([new Uint8Array(this.companyAgreement)], { type: 'application/octet-stream' }));
    formData.append('representativeFirstName', this.signUpForm.representativeFirstName);
    formData.append('representativeLastName', this.signUpForm.representativeLastName);
    formData.append('representativeBirthDate', this.signUpForm.representativeBirthDate);
    formData.append('representativeBirthPlace', this.signUpForm.representativeBirthPlace);
    formData.append('representativeAddress', this.signUpForm.representativeAddress);
    formData.append('representativePesel', this.signUpForm.representativePesel);
    formData.append('representativePhone', this.signUpForm.representativePhone);
    formData.append('representativeEmail', this.signUpForm.representativeEmail);
    formData.append('representativeIdNumber', this.signUpForm.representativeIdNumber);
    formData.append('representativeIdScan', new Blob([new Uint8Array(this.representativeIdScan)], { type: 'application/octet-stream' }));
    
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');

    this.apiService.postJuridicalPerson(formData, headers).subscribe(
      () => {
        alert("Account has been successfully created. Follow instructions in email.")
      },
      (error) => {
        alert("An error occured while creating an account:\n" + JSON.stringify(error));
      }
    );
  }
}
