import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message.model';
import { ChatService } from '../services/chat/chat.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    messages: Array<Message>;

    constructor(private chatService: ChatService) {
        this.messages = new Array<Message>();
    }

    ngOnInit() {
        let message = new Message("Welcome to my ChatBot", "assets/images/cocobot.svg", new Date());
        this.messages.push(message);
    }

    sendMessage = (messageContent) => {
        let message = new Message(messageContent.value, "assets/images/user.png", new Date());
        this.messages.push(message);
        this.chatService.sendMessage(messageContent.value).subscribe(
            res => {
                //let message = new Message(res.result.speech, "assets/images/cocobot.svg", )
                console.log(res['result']['fulfillment']['speech']);
                let message = new Message(res['result']['fulfillment']['speech'], "assets/images/cocobot.svg", new Date());
                this.messages.push(message);
            },
            err => {
                console.log(err)
            }
        );
    }

}
