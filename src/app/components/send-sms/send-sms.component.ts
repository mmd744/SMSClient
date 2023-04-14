import { Component } from '@angular/core';
import { SmsService } from 'src/app/services/sms.service';

@Component({
  selector: 'app-send-sms',
  templateUrl: './send-sms.component.html',
  styleUrls: ['./send-sms.component.css']
})
export class SendSmsComponent {

  apiErrorMessage = '';
  errorMessageVisible: boolean = false;
  errorMessageText: string = '';
  successMessageVisible: boolean = false;
  successMessageText: string = 'Sms message sent successfully! Refreshing the page...';

  countryCode = "994";
  prefixes: string[] = [
    "50", "51", "55", "70", "77"
  ];

  to: string[] = [];
  content: string = '';

  senderSelectedPrefix: string = '';
  senderPhoneNumber: string = '';

  receiverSelectedPrefix: string = '';
  receiverPhoneNumber: string = '';

  constructor(private smsService: SmsService) { }

  addReceiver() {
    const newReceiver = `${this.countryCode}${this.receiverSelectedPrefix}${this.receiverPhoneNumber}`;
    if (!this.checkNumber(newReceiver)) {
      this.errorMessageText = `One of the rules violated! [Prefix selection is required / use only numbers / phone number must contain exactly 7 digits]`;
      this.errorMessageVisible = true;
      return;
    }
    else {
      this.errorMessageVisible = false;
    }
    this.to.push(newReceiver);
    this.receiverPhoneNumber = '';
    this.receiverSelectedPrefix = '';
  }

  send() {
    const from = `${this.countryCode}${this.senderSelectedPrefix}${this.senderPhoneNumber}`;
    if (!this.checkNumber(from)) {
      this.errorMessageText = 'Please select a prefix for sender phone number and be sure to only use numbers when typing the remaining part of phone number.';
      this.errorMessageVisible = true;
      return;
    }
    else {
      this.errorMessageVisible = false;
    }

    if (this.to.length == 0) {
      this.errorMessageText = 'At least one receiver is required.';
      this.errorMessageVisible = true;
      return;
    }
    else {
      this.errorMessageVisible = false;
    }

    const sms = {
      from: from,
      to: this.to,
      content: this.content,
    };

    this.smsService.send(sms).subscribe(
      (data) => {
        this.successMessageVisible = true;
        setTimeout(() => {
          location.reload();
        }, 3000);
      },
      (error) => {
        if (error.status === 0) {
          this.apiErrorMessage = 'Server is not available';
        } 
        else {
          this.apiErrorMessage = error.message;
        }
      }
    );
  }

  checkNumber(str: string): boolean {
    if (str.length !== 12) {
      return false;
    }
  
    for (let i = 0; i < str.length; i++) {
      if (isNaN(parseInt(str.charAt(i), 10))) {
        return false;
      }
    }

    return true;
  }
}
