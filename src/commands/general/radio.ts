import { SlashCommandBuilder, ChatInputCommandInteraction, inlineCode, Message, spoiler } from 'discord.js';
import { CommandClass } from '../../structures/command.js';

export default new CommandClass({
    data: new SlashCommandBuilder()
        .setName('radio')
        .setDescription('Generates Radio Frequency'),
    opt: {
        userPermissions: ['SendMessages'],
        botPermissions: ['SendMessages'],
        category: 'General',
        cooldown: 5,
        visible: true,
        guildOnly: false,
    },
    async execute(interaction: ChatInputCommandInteraction<'cached'>) {
        const oldMsg = await interaction.channel.messages.fetch({ limit: 1 }).then(messages => messages.first()) as Message;
        let oldFrequency = '';
        if (oldMsg?.author.bot) {
            oldFrequency = oldMsg.content.match(/\d+\.\d+/)?.[0] || '';
            await oldMsg.delete();
        }

        const msg = await interaction.reply({
            content: 'Generating...\nPrevious frequency: ' + (oldFrequency ? spoiler(`${oldFrequency}`) : 'N/A'),
            fetchReply: true
        });

        setTimeout(() => {
            const Frequency = (Math.random() * 98 + 1).toFixed(2);
            interaction.editReply({
                content: `New Frequency Is ${spoiler(`${Frequency}`)}.\nPrevious frequency: ${oldFrequency ? spoiler(`${oldFrequency}`) : 'N/A'}`,
            });
        }, 3000);
        console.log(msg)
    },
});
