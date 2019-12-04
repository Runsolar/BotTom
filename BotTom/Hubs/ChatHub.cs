using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using BotTom.Models;


namespace BotTom.Hubs
{
    public class ChatHub : Hub
    {
        public async Task _newMessageFromClient(IncomingMessage inMessage)
        {
            OutboundMessage outMessage = new OutboundMessage();
            outMessage.content = inMessage.content;
            await Clients.All.SendAsync("broadcastMessageReceived", outMessage);
        }
    }
}
