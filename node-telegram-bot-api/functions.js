module.exports = {
	platform:function(bot,msg) {	
		const opts = {
				reply_markup: {
				  inline_keyboard: [
					[
						{
							text: 'Console',
							callback_data: 'console'
						}
					]
					,
					[
						{
							text: 'PC',
							callback_data: 'pc'
						}
					],
					[
						{
							text: 'Mobile',
							callback_data: 'mobile'
						}
					]
				  ]
				}
			};
	
			bot.sendMessage(msg.from.id, "Select the Platform you play games on mostly", opts)
	},
	category:function(bot,msg) {
		const opts = {
				reply_markup: {
				  inline_keyboard: [
					[
						{
							text: 'Adventure',
							callback_data: 'adv'
						}
					],
					[
						{
							text: 'Fighting Game',
							callback_data: 'fight'
						}
					],
					[
						{
							text: 'Moba',
							callback_data: 'moba'
						}
					],
					[
						{
							text: 'Shooter Games',
							callback_data: 'shoot'
						}
					],
					[
						{
							text: 'Puzzle',
							callback_data: 'action'
						}
					]
				  ]
				}
			};
			
			bot.sendMessage(msg.from.id, "Which category of games do you like the most?", opts)
	},
	ownPlatform:function(bot,msg) {
		const opts = {
				reply_markup: {
				  inline_keyboard: [
					[
						{
							text: 'I own a console',
							callback_data: 'yes'
						}
					],
					[
						{
							text: 'I don\' own a console',
							callback_data: 'no'
						}
					]
				  ]
				}
			};
			
			bot.sendMessage(msg.from.id, "Do you own a gaming platform or go to a game zone ?", opts)
	},
	typeOfGamer:function(bot,msg) {
		const opts = {
				reply_markup: {
				  inline_keyboard: [
					[
						{
							text: 'Heavy',
							callback_data: 'Heavy'
						}
					],
					[
						{
							text: 'Casual',
							callback_data: 'Casual'
						}
					],
					[
						{
							text: 'Occasional',
							callback_data: 'Occasional'
						}
					]
				  ]
				}
			};
			
			bot.sendMessage(msg.from.id, "Are you a heavy, casual, or occasional gamer ?", opts)
	},
	socialGamer:function(bot,msg) {
		const opts = {
				reply_markup: {
				  inline_keyboard: [
					[
						{
							text: 'Friends',
							callback_data: 'Social Gamer'
						}
					],
					[
						{
							text: 'No',
							callback_data: 'Loner Gamer'
						}
					]
				  ]
				}
			};
			
			bot.sendMessage(msg.from.id, "Do you play games with friends or alone ?", opts)
	},
	gameTalk:function(bot,msg) {
		const opts = {
				reply_markup: {
				  inline_keyboard: [
					[
						{
							text: 'Yes',
							callback_data: 'yes3'
						}
					],
					[
						{
							text: 'No',
							callback_data: 'no3'
						}
					]
				  ]
				}
			};
			
			bot.sendMessage(msg.from.id, "Do you talk about games in school or workplace ?", opts)
	}
}