import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-domestic-transfer',
  templateUrl: './domestic-transfer.component.html',
  styleUrls: ['./domestic-transfer.component.scss'],
})
export class DomesticTransferComponent implements OnInit {
  domesticTransferData = {
    receiverName: '',
    receiverAccountNumber: '',
    title: '',
    amount: 0,
    date: new Date()
  };

  constructor(private modalController: ModalController) { }
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

    submitForm() {
      this.modalController.dismiss(this.domesticTransferData);
    }

    closeModal() {
      this.modalController.dismiss();
    }
}
