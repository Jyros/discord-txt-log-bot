const { Client, Collection } = require("discord.js");
const client = (global.client = new Client({ fetchAllMembers: true }));
const config = require("./src/Base/config");

client.commands = new Collection();
client.aliases = new Collection();
client.cooldown = new Map();
client.owner = {
owner: config.owner.name,
id: config.owner.id,
};
client.modules = {
  Events: [
    "System",
    "Channel",
    "Member",
    "Message"
  ],
};

require("./src/Binaries/Engine/Event");
require("./src/Binaries/Executors/Functions")(client);

client
.login(config.TOKEN)
.then(() => console.log("\x1b[42m","\x1b[30m",`Bot connected!`))
.catch(() => console.log("\x1b[41m","\x1b[30m",`Bot can't connected!`));
client.on('warn', m => console.log("\x1b[41m","\x1b[30m",`[WARN] - ${m}`));
client.on('error', m => console.log("\x1b[41m","\x1b[30m",`[ERROR] - ${m}`));
client.on("disconnect", () => console.log("\x1b[41m","\x1b[30m",`Bot disconnected!`));
client.on("reconnecting", () => console.log("\x1b[41m","\x1b[30m",`Bot reconnecting!`));