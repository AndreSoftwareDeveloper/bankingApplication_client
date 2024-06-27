import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-setup-data',
  templateUrl: './setup_data.component.html'
})

export class SetupDataComponent implements OnInit {
  setupData: any = {};  
  verificationToken: number = 0;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
    this.verificationToken = params['verificationToken'];    
  });
}

  checkVerificationToken(): void { }

  submitForm(): void {
    const password = this.setupData.password;
    const retypePassword = this.setupData.retypePassword;
    const nip = this.setupData.nip;
    const regon = this.setupData.regon;
    
    if (this.checkData(password, retypePassword, nip, regon)) {

      this.apiService.patchData(
        this.verificationToken,
        password,
        nip,
        regon).subscribe(
          () => {
            alert("Data has been set successfully.");
          },
          () => {}
      ); 
    }      
  }

  checkData(password: string, retypePassword: string, nip: number, regon: number): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

    const isValidNip = nip >= 1000000000 && nip <= 9999999999; //The NIP number must be a 10-digit number
    const isValidRegon = (regon >= 100000000 && regon <= 999999999) || (regon >= 10000000000000 && regon <= 99999999999999); //The REGON number must be a 9 or 14-digit number
    const isPasswordMatch = password === retypePassword;
    const isValidPassword = password.length >= 8 && passwordRegex.test(password);

    if (!isValidNip) {
      alert("NIP must be a 10-digit value.");
      return false;
    }

    if (!isValidRegon) {
      alert("REGON must be a 9 or 14-digit value.");
      return false;
    }

    if (!isPasswordMatch) {
      alert("Passwords must be the same.");
      return false;
    }

    if (!isValidPassword) {
      alert("The password must be at least 8 characters long and contain at least one lowercase letter, an uppercase letter, a number, and a special character.");
      return false;
    }

    return true;
  }
}
