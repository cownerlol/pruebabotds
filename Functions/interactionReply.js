const {EmbedBuilder} = require('discord.js')

function errorReply(interaction,razon,invisible){
    interaction.reply({
        embeds:[
            new EmbedBuilder()
            .setTitle('Se realizó correctamente la operación.')
            .addFields(
                {name:'tilin', value:`\`\`\`yaml\n${razon}\`\`\``}
            )
            .setColor('Green')
        ],
        ephemeral:invisible
    })
}

module.exports = errorReply