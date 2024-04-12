import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ModalController } from '@ionic/angular';
import { DomesticTransferComponent } from '../domestic-transfer/domestic-transfer.component';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  customer: any;

  constructor(public apiService: ApiService, //I'm not sure it is ok to be public for stuff like that
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      if (window.history.state.customer) 
        this.customer = window.history.state.customer;      
    });
  }

  async createDomesticTransfer() {
    const modal = await this.modalController.create({
      component: DomesticTransferComponent
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    const transaction = {
      Date: `${data.date.year}-${data.date.month}-${data.date.day}`,
      Amount: data.amount,
      Currency: 'PLN',
      InitiatorAccountNumber: '000000-0200001198', //TODO
      ReceiverBankCode: 3060, //TODO
      ReceiverBankCountry: 'PL',
      ContractorAccountNumber: data.receiverAccountNumber,
      BeneficiaryData: data.receiverName,
      InitiatorReferences: 'V0123456789/S0123456789/K0123456789', //TODO
      BeneficiaryCountry: 'PL',
      ChargesAccount: '', //TODO
      ChargesInstructions: 2, //TODO
      TransactionDetails: data.title
    };
    this.apiService.appendToTransactionsHistory(transaction)
      .subscribe((response) => {
        console.log('Odpowiedź z API:', response);
      }, (error) => {
        console.error('Błąd w API:', error);
      });
  }
}
