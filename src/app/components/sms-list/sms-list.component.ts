import { Component, OnInit } from '@angular/core';
import { SmsService } from '../../services/sms.service';
import { SMS } from '../../sms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sms-list',
  templateUrl: './sms-list.component.html',
  styleUrls: ['./sms-list.component.css']
})
export class SmsListComponent implements OnInit {
  errorMessage: string = '';
  smsList: SMS[] = [];

  constructor(private smsService: SmsService) { }

  ngOnInit() {
    this.getSmsList();
  }

  getSmsList() {
    this.smsService.getSmsList().subscribe(
      (data: SMS[]) => {
        this.smsList = data;
        if (this.smsList.length === 0) {
          this.errorMessage = 'No sms messages to display';
        } 
        else {
          this.errorMessage = '';
        }
      },
      (error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.errorMessage = 'Server is not available';
        } 
        else {
          this.errorMessage = error.message;
        }
      }
    );
  }
  
}
