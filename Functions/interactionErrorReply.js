const {EmbedBuilder} = require('discord.js')

function errorReply(interaction,razon,invisible){
    interaction.reply({
        embeds:[
            new EmbedBuilder()
            .setTitle('Error')
            .addFields(
                {name:'Error', value:`\`\`\`yaml\n${razon}\`\`\``}
            )
            .setColor('Green')
        ],
        ephemeral:invisible
    })
}

module.exports = errorReply