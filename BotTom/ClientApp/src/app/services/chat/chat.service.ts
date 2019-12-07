import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';

//import { Http, Headers } from "@angular/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { OutboundMessage } from '../../models/outbound-message.model';
import { IncomingMessage } from '../../models/incoming-message.model';

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .configureLogging(signalR.LogLevel.Information)
    .build();

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    myConnectionId: string = "000000000000000000";
    incomingmessages: Array<IncomingMessage>;

    constructor() {
        this.incomingmessages = new Array<IncomingMessage>();
        this.registerOnServerEvents();
        this.startConnection(); // connecting to the Hub
    }

    private registerOnServerEvents(): void {
        let self: ChatService = this;
        connection.on("broadcastMessageReceived", (newIncomingMessage: IncomingMessage) => {
            //console.log(newIncomingMessage.message);
            self.addIncomingMessageInPool(newIncomingMessage);
        });
    }

    /* Register of the client side functions */
    // добавляем сообщение от сервера в пул 
    addIncomingMessageInPool = (newIncomingMessage: IncomingMessage): void => {
        newIncomingMessage.avatar = "assets/images/bot.png";
        this.incomingmessages.push(newIncomingMessage);
    }

    // отправляем сообщение на сервер
    sendMsgOnServer = (newOutboundMessage: OutboundMessage): void => {
        connection.send("_newMessageFromClient", newOutboundMessage);
    }

    public sendServicesMsgOnServer = (instruction: number, message: string): void => {
        let newOutboundMessage: OutboundMessage = new OutboundMessage();
        newOutboundMessage.connectionId = this.myConnectionId;
        newOutboundMessage.receiverId = null;
        newOutboundMessage.instruction = instruction;
        newOutboundMessage.content = message;
        newOutboundMessage.prvMsg = false;
        this.sendMsgOnServer(newOutboundMessage);
    }

    private startConnection = (): void => {
        connection.start().catch(function (err) {
            return console.error(err.toString());
        });
    }
}
