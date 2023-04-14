import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SmsService } from 'src/app/services/sms.service';
import { SMS } from 'src/app/sms';

@Component({
  selector: 'app-sms-details',
  templateUrl: './sms-details.component.html',
  styleUrls: ['./sms-details.component.css']
})
export class SmsDetailsComponent implements OnInit {
  sms: SMS = {
    id: '',
    from: '',
    to: '',
    status: '',
    content: ''
  };
  
  constructor(
    private route: ActivatedRoute,
    private smsService: SmsService
  ) { }

  adjustContent(sms: SMS) {
    if (!sms.content) {
      sms.content = 'No content';
    }
    this.sms = sms;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.smsService.getSmsById(id).subscribe(
      sms => this.adjustContent(sms),
      error => console.error(error)
    );
  }
}
