using System;
using System.Text;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using BotTom.Models;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

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
        public async Task _newMessageFromClient(IncomingMessage inMessage)
        {
            var dialogData = new QueryDialogFlowData();
            dialogData.lang = "ru";
            dialogData.sessionId = "1234567890";
            dialogData.query = inMessage.content;


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
