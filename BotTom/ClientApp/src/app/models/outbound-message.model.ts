export class OutboundMessage {
    connectionId: string;
    receiverId: number;
    prvMsg: boolean;
    instruction: number;
    content: string;

    constructor(
        connectionId?: string,
        receiverId?: number,
        prvMsg?: boolean,
        instruction?: number,
        content?: string
    ) {
        this.connectionId = connectionId;
        this.receiverId = this.receiverId;
        this.prvMsg = prvMsg;
        this.instruction = instruction;
        this.content = content;
    }
}
