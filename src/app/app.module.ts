import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SmsDetailsComponent } from './components/sms-details/sms-details.component';
import { SmsService } from './services/sms.service';
import { SmsListComponent } from './components/sms-list/sms-list.component';
import { SendSmsComponent } from './components/send-sms/send-sms.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SmsDetailsComponent,
    SmsListComponent,
    SendSmsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [SmsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
