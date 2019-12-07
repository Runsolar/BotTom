export class IncomingMessage {
    senderId: number;
    receiverId: number;
    connectionId: string;
    prvMsg: boolean;
    msgId: string;
    timestamp: string;
    senderNickName: string;
    senderNickColor: string;
    receiverNickName: string;
    receiverNickColor: string;
    msgColor: string;
    avatar: string;
    content: string;

    constructor(
        senderId?: number,
        receiverId?: number,
        connectionId?: string,
        prvMsg?: boolean,
        msgId?: string,
        timestamp?: string,
        senderNickName?: string,
        senderNickColor?: string,
        receiverNickName?: string,
        receiverNickColor?: string,
        msgColor?: string,
        avatar?: string, 
        content?: string,     
    ) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.connectionId = connectionId;
        this.prvMsg = prvMsg;
        this.msgId = msgId;
        this.timestamp = timestamp;
        this.senderNickName = senderNickName;
        this.senderNickColor = senderNickColor;
        this.receiverNickName = receiverNickName;
        this.receiverNickColor = receiverNickColor;
        this.msgColor = msgColor;
        this.content = content;
        this.avatar = avatar;
    }

}
