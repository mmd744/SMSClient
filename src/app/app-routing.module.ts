import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmsDetailsComponent } from './components/sms-details/sms-details.component';
import { SmsListComponent } from './components/sms-list/sms-list.component';
import { SendSmsComponent } from './components/send-sms/send-sms.component';

const routes: Routes = [
  { path: '', redirectTo: 'sms-list', pathMatch: 'full' },
  { path: 'sms-list', component: SmsListComponent },
  { path: 'sms/:id', component: SmsDetailsComponent },
  { path: 'send-new', component: SendSmsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
