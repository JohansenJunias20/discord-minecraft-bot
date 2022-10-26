require('dotenv').config();
const Discord = require('discord.js');
const { Rcon } = require("rcon-client")
var rcon;
async function startRcon() {
    rcon = await Rcon.connect({
        host: "192.168.1.70", port: 25575, password: "minecraft"
    })
    console.log("connecteing to rcon")
    // console.log(await rcon.send("list"))

    let responses = await Promise.all([
        // rcon.send("help"),
        // rcon.send("whitelist list")
    ])

    for (response of responses) {
        console.log(response)
    }
}
startRcon()
// rcon.end()
const client = new Discord.Client();
client.login(process.env.TOKEN);

client.once('ready', () => {
    console.log("ready!");
})

client.on("message", async (msg) => {
    if (msg.author.bot) return;
    // console.log(msg);
    var splited = msg.content.split(" ")
    const command = splited[0];
    if (splited.length > 1) {
        splited.shift();
    }
    const params = splited;
    console.log({ command, params })
    switch (command) {
        case "!list":
            var rsp = await rcon.send("list");
            msg.channel.send(rsp);
            console.log("sended");
            break;
        case "!difficulty":
            // if(params[)
            if (!params[0]) {
                msg.channel.send("please give parameter <peaceful|easy|normal|hard>")
                return;
            }
            console.log({ params })
            var rsp = await rcon.send(`/difficulty ${params[0]}`);
            msg.channel.send(rsp);
            console.log("sended");
            break;
        case "!help":
            const result =
                `!list = list player online\n!difficulty <peaceful|easy|normal|hard> = set difficulty\n!help = list available commands`
            msg.channel.send(result);
            break;
        default:
            const defaultresult =
            `Unknown ${command} command\n!list = list player online\n!difficulty <peaceful|easy|normal|hard> = set difficulty\n!help = list available commands`
            msg.channel.send(defaultresult);
            break;
    }
})