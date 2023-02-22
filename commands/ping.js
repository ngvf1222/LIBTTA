const { SlashCommandBuilder } = require('discord.js');
const logger = require('../logger');
const fs = require('fs')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		logger.info(`${interaction.user.id}가 ping함`)
		await interaction.reply('Pong!');
	},
};