namespace BotTom.Models
{
    public class OutboundMessage
    {
        public int senderId { get; set; }
        public int receiverId { get; set; }
        public bool prvMsg { get; set; }
        public string msgId { get; set; }
        public string timestamp { get; set; }
        public string senderNickName { get; set; }
        public string senderNickColor { get; set; }
        public string receiverNickName { get; set; }
        public string receiverNickColor { get; set; }
        public string msgColor { get; set; }
        public string content { get; set; }
        public string avatar { get; set; }
    }
}
