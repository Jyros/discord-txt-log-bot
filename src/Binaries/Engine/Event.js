const fs = require("fs");

client.modules.Events.forEach(sysFiles => {
    fs.readdir(`./src/Content/Events/${sysFiles}`, (err, files) => {
      if (err) return console.error(err);
        files.filter((file) => file.endsWith(".js")).forEach((file) => {
      let prop = require(`../../Content/events/${sysFiles}/${file}`);
        if (!prop.conf) return;
      client.on(prop.conf.name, prop);
        console.log("\x1b[40m","\x1b[37m",`${prop.conf.e_name} files loaded!`);
    });
  });
});