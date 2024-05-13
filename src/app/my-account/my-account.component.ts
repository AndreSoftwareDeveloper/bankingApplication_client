import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ModalController } from '@ionic/angular';
import { DomesticTransferComponent } from '../domestic-transfer/domestic-transfer.component';
import { NaturalPerson } from '../models/NaturalPerson';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  customer: NaturalPerson | undefined;

  constructor(public apiService: ApiService, //I'm not sure it is ok to be public for stuff like that
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      if (window.history.state.customer) 
        this.customer = window.history.state.customer;
        console.log(this.customer)
    });
  }

  async createDomesticTransfer() {
    const modal = await this.modalController.create({
      component: DomesticTransferComponent
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();

    var transactionData = new FormData();
    transactionData.append("Date", new Date(2022, 3, 15).toLocaleDateString()); //TODO
    transactionData.append("Amount", data.amount);
    transactionData.append("Currency", 'PLN');
    transactionData.append("InitiatorAccountNumber", '000000-0200001198');
    transactionData.append("ReceiverBankCode", '3060');
    transactionData.append("ReceiverBankCountry", 'PL');
    transactionData.append("ContractorAccountNumber", data.receiverAccountNumber);
    transactionData.append("BeneficiaryData", data.receiverName);
    transactionData.append("InitiatorReferences", 'V0123456789/S0123456789/K0123456789');
    transactionData.append("BeneficiaryCountry", 'PL');
    transactionData.append("ChargesAccount", '44');
    transactionData.append("ChargesInstructions", '2');
    transactionData.append("TransactionDetails", data.title);

    this.apiService.appendToTransactionsHistory(transactionData)
      .subscribe((response) => {
        console.log('Odpowiedź z API:', response);
      }, (error) => {
        console.error('Błąd w API:', error);
      });
  }
}
