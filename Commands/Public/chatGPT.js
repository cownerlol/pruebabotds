const {SlashCommandBuilder,EmbedBuilder,ChatInputCommandInteraction} = require('discord.js')
const {Configuration, OpenAIApi} = require('openai')

const errReply = require('../../Functions/interactionErrorReply')
const correReply = require('../../Functions/interactionReply')

const config = require('../../config.json')

const configuration = new Configuration({
    apiKey:config.openAiToken
})
const openai = new OpenAIApi(configuration)

module.exports = {
    developer: false,
    data: new SlashCommandBuilder()
    .setName('chat-gpt')
    .setDescription('Interactua con ChatGPT.')
    .addStringOption((option) =>
        option.setName('pregunta')
        .setDescription('Escribe una pregunta.')
        .setMaxLength(300)
        .setRequired(true)
        ),
        /**
         * 
         * @param {ChatInputCommandInteraction} interaction 
         */
        async execute(interaction){
            const {options} = interaction
            const pregunta = options.getString('pregunta')
            try {
                const res = await openai.createCompletion({
                    model:'text-davinci-003',
                    prompt: pregunta,
                    max_tokens: 2048,
                    temperature:0.5,
                })

                const embed = new EmbedBuilder()
                .setTitle('Pregunta al bot.')
                .setAuthor({name:`${interaction.user.tag} Le hizo una pregunta al bot.`, iconURL: interaction.user.avatarURL({dynamic:true})})
                .setColor('Random')
                .setDescription(`Pregunta: \`\`\`${pregunta}\`\`\`\n\n Respuesta: \`\`\`${res.data.choices[0].text}\`\`\` `)

                return await interaction.channel.send({embeds:[embed]})
            } catch (error) {
                console.log(error);
                return errReply(interaction,"Se produjo un error con la ejecución del comando.",true)
            }
        }
};