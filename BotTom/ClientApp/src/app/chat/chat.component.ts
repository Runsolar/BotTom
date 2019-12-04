import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message.model';
import { ChatService } from '../services/chat/chat.service';

import { OutboundMessage } from '../models/outbound-message.model';
import { IncomingMessage } from '../models/incoming-message.model';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    //messages: Array<Message>;
    messages: Array<IncomingMessage>;

    constructor(private chatService: ChatService) {
        this.chatService = chatService;
        //this.messages = new Array<Message>();
        this.messages = chatService.incomingmessages;
    }

    ngOnInit() {
        let message = new IncomingMessage();
        message.content = "Добро пожаловать!";
        message.avatar = "assets/images/bot.png";
        message.timestamp = Date().toLocaleString();
        this.messages.push(message);
    }

    //Отправка сообщения
    messageContent: string = '';
    msglimit: number = 255;
    maxmsglength: number = 255;
    prvMsg: boolean = false;

    onKey(event: any) { // without type info
        if (this.msglimit > 0) this.msglimit = this.maxmsglength - this.messageContent.length;
    }

    onClickSendMsg = function (): number {

        let message = new IncomingMessage();
        message.content = this.messageContent.substr(0, this.maxmsglength);
        message.avatar = "assets/images/user.png";
        message.timestamp = Date().toLocaleString();
        this.messages.push(message);

        let newOutboundMessage: OutboundMessage = new OutboundMessage();
        newOutboundMessage.content = this.messageContent.substr(0, this.maxmsglength);
        this.chatService.sendMsgOnServer(newOutboundMessage);
        this.messageContent = '';
        this.msglimit = this.maxmsglength;
        return 0;
    }

/*
    sendMessage = (messageContent) => {
        let message = new Message(messageContent.value, "assets/images/user.png", new Date());
        this.messages.push(message);
        this.chatService.sendMessage(messageContent.value).subscribe(
            res => {
                //let message = new Message(res.result.speech, "assets/images/cocobot.svg", )
                console.log(res['result']['fulfillment']['speech']);
                let message = new Message(res['result']['fulfillment']['speech'], "assets/images/bot.png", new Date());
                this.messages.push(message);
            },
            err => {
                console.log(err)
            }
        );
    }
    */

}
