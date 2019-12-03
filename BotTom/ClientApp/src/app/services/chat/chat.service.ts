import { Injectable, EventEmitter } from '@angular/core';
//import { Http, Headers } from "@angular/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    public phraseResponded: EventEmitter<number> = new EventEmitter<number>();

    url = "https://api.dialogflow.com/v1/query?v=20150910";
    accessToken = "2e4bd97ced8c4518b61cc98c7845a63d";

    constructor(private http: HttpClient) { }

    public sendMessage(message: string): Observable<any> {
        let data = {
            lang: "ru",
            sessionId: "123456",
            query: message
        }

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.accessToken
        });
        //headers.append("Authorization", "Bearer " + this.accessToken);

        return this.http.post(this.url, data, { headers: headers });
    }
}
