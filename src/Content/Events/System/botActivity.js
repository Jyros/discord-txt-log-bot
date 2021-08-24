const utils = require("../../../Base/utils.json")

module.exports = async () => {

client.user.setStatus(`${utils.BOT.ACTIVITY.STATUS}`);

setInterval(() => {
const ready = utils.BOT.ACTIVITY.NAME;
const index = Math.floor(Math.random() * (ready.length));

client.user.setActivity(`${ready[index]}`, {type: `${utils.BOT.ACTIVITY.TYPE}`});
}, 10000);

client.channels.cache.get(utils.BOT.VOICE_CHANNEL).join()
.catch(err => console.error("\x1b[41m",`[ERROR] Bot failed to connect to voice channel.`));

};

module.exports.conf = {
    name: "ready",
    e_name:"botActivity",
};