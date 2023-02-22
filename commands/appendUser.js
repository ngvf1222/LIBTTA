const { SlashCommandBuilder } = require('discord.js');
const logger = require('../logger');
const db = require('../dbc');
const fs = require('fs')
console.log('a')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('가입')
		.setDescription('은행에 가입합니다.'),
	async execute(interaction) {
		await interaction.deferReply();
		db.appendUser(interaction.user.id).then(()=>{
		logger.info(`${interaction.user.id}가 가입됨`)
	})
		await interaction.editReply('가입 완료!');
	},
};