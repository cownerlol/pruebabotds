function loadCommands(client) {
    const ascii = require('ascii-table');
    const fs = require('fs');
    const table = new ascii().setHeading('Commands', 'Status');

    let commandsArray = [];

    const commandsFolder = fs.readdirSync('./Commands');

    for (const folder of commandsFolder) {
        const commandsFiles = fs.readdirSync(`./Commands/${folder}`).filter((file) => file.endsWith(".js"));

        for (const file of commandsFiles) {
            const commandFile = require(`../Commands/${folder}/${file}`)

            const properties = { folder, ...commandFile };
            client.commands.set(commandFile.data.name, properties);

            commandsArray.push(commandFile.data.toJSON());
            table.addRow(file, 'Loaded');
            continue;
        }
    }
    client.application.commands.set(commandsArray);
    return console.log(table.toString(), "\nLoaded");
}

module.exports = { loadCommands };