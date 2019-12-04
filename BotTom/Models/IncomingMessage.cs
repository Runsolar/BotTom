namespace BotTom.Models
{
    public class IncomingMessage
    {
        public string connectionId { get; set; }
        public int? receiverId { get; set; }
        public bool prvMsg { get; set; }
        public int instruction { get; set; }
        public string content { get; set; }
    }
}
