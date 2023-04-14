import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SMS } from '../sms';

@Injectable({
    providedIn: 'root'
  })
  export class SmsService {
    private baseUrl = 'http://localhost:5000/api/v1/sms';
  
    constructor(private http: HttpClient) { }
  
    getSmsById(id: string | null): Observable<SMS> {
        if (id == null) {
            throw new Error('Invalid SMS ID');
        }
        const url = `${this.baseUrl}/${id}`;
        return this.http.get<SMS>(url);
    }

    getSmsList(): Observable<SMS[]> {
        return this.http.get<SMS[]>(`${this.baseUrl}/all`);
    }

    send(sms: { from: string, to: string[], content: string }): Observable<any> {
        return this.http.post(this.baseUrl, sms);
    }
  }
  