import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-setup_data',
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
    
    if (this.checkData(password, retypePassword, nip)) {

      this.apiService.putData(
        this.verificationToken,
        this.setupData.password,
        this.setupData.nip,
        this.setupData.regon).subscribe(
          (result) => {
            console.log(result);
          },
          (error) => {
            console.error(error);
          }
      ); 
    }      
  }

  checkData(password: string, retypePassword: string, nip: number): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

    if (nip < 1000000000 || nip > 9999999999) {
      alert("NIP must be 10 digit value.")
      return false;
    }      

    if (password != retypePassword) {
      alert("Passwords must be the same.")
      return false;
    }

    if (password.length >= 8 && passwordRegex.test(password))
      return true;
    else
      alert("The password must be at least 8 characters long and contain at least one lowercase letter, an uppercase letter, a number and a special character.")

    return false;      
  }
}
