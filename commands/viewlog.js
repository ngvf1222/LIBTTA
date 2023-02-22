const { SlashCommandBuilder } = require('discord.js');
const logger = require('../logger');
const fs = require('fs')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('로그보기')
		.setDescription('로그를 봅니다.')
        .addStringOption(option =>
            option.setName('date')
                .setDescription('로그 확인할 날짜(년-월-일)')
                .setRequired(true)),
	async execute(interaction) {
        await interaction.deferReply();
        const filename = `${interaction.options.getString('date') ?? 'null'}.log`;
        logger.info(`${interaction.user.id}가 ${interaction.options.getString('date')}.log를 확인하였습니다`)
        try {
            const data = fs.readFileSync(`logs/${filename}`, 'utf8')
            await interaction.editReply('```\n'+data+'\n```');
        } catch (err) {
            await interaction.editReply('로그 파일이 없습니다.');
        }
	},
};