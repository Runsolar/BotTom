using System;
using System.Text;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using BotTom.Models;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;

namespace BotTom.Hubs
{
    class QueryDialogFlowData
    {
        public string lang { get; set; }
        public string sessionId { get; set; }
        public string query { get; set; }
    }
    public class ChatHub : Hub
    {
        static List<User> users = new List<User>();
        public async Task _newMessageFromClient(IncomingMessage inMessage)
        {
            var dialogData = new QueryDialogFlowData() { lang = "ru", sessionId = Guid.NewGuid().ToString(), query = inMessage.content };

            var json = JsonConvert.SerializeObject(dialogData);
            var data = new StringContent(json, Encoding.UTF8, "application/json");

            var httpClient = new HttpClient();
            var url = "https://api.dialogflow.com/v1/query?v=20150910";
            var accessToken = "b777448118874e8d92c829149228f94d";
            //using var httpClient = new HttpClient();

            httpClient.DefaultRequestHeaders.Add("User-Agent", "C# console program");
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            var response = await httpClient.PostAsync(url, data);
            string result = response.Content.ReadAsStringAsync().Result;
    
            OutboundMessage outMessage = new OutboundMessage();
            outMessage.content = (JObject.FromObject(JObject.FromObject((JObject.Parse(result).GetValue("result"))).GetValue("fulfillment")).GetValue("speech")).ToString();
            await Clients.All.SendAsync("broadcastMessageReceived", outMessage);

            httpClient.CancelPendingRequests();
        }
    }
}
