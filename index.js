require('dotenv').config();
const Discord = require('discord.js');
const WS = require("ws");
var ws = new WS(`ws://192.168.1.70:25575/${process.env.RCON_PASSWORD}/`);
console.log(`ws://192.168.1.70:25575/${process.env.RCON_PASSWORD}/`)
ws.onopen = function (event) {

    ws.ping("test", (err) => {
        console.log(err)
    })
    console.log("WebSocket is onopen now.");
    ws.send(`/say "test"`)
};

ws.onmessage = function (event) {
    console.log("WebSocket is onmessage now.");
};
ws.onerror = (e) => {
    console.log("websocket error")
}
ws.onclose = function (event) {
    console.log("WebSocket is onclose now.");

};
const client = new Discord.Client();
client.login(process.env.TOKEN);

client.once('ready', () => {
    console.log("ready!");
})

client.on("message", (msg) => {
    console.log(msg);
})