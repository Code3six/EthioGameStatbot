const majorVersion = parseInt(process.versions.node.split('.')[0], 10);
if (majorVersion <= 5) {
  const deprecate = require('depd')('node-telegram-bot-api');
  deprecate('Node.js v5.x and below will no longer be supported in the future');
  module.exports = require('./lib/telegram');
} else {
  module.exports = require('./src/telegram');
}

const TelegramBot = require('node-telegram-bot-api');
const token = '2003202946:AAGKFUyC70eAVSPPe9lOE5VMFz_MHHupT_w';

const bot = new TelegramBot(token, {polling: true});

const func = require('./functions.js');

global.s="";
var _school;
var _uni = null;
var _work;

function StringCheck(v){
	if(typeof(v) == "string")
		return true;
}

	
		//Start


bot.onText(/\/start/, function (msg, match) {
	
		// Category Question Options
	const opts = {
		    reply_markup: {
		      inline_keyboard: [
		        [
					{
						text: 'Ok',
						callback_data: 'ok'
					}
		       	]
		      ]
		    }
		  };
		  
		  	// Briefing
    bot.sendMessage(msg.from.id, "Hi, We are gathering information on gamers for game competitions with money prizes and game development purposes.\nPlease answer the following question accurately. ", opts);
	
		
});

		
		//Personal Information
		

bot.on("callback_query", function(ans) {
	if(ans.data == 'ok') {
	s = "What is your full name ?."
	
	bot.sendMessage(ans.from.id, s)
	
	}
	});

bot.on("polling_error", console.log);

bot.onText(/[a-zA-Z]{2,} [a-zA-Z]{2,}( [a-zA-Z]{2,})?/, function(msg, match){
				if(s == "What is your full name ?.") {
					s = "What year were you born ?"
					_name = match.input;
					bot.sendMessage(msg.from.id, s);
				}
			
});


bot.onText(/([0-9]){4}/, function(msg, match){
			if(s == "What year were you born ?"){
				s = "What is your gender ?"
				_year = match.input
				bot.sendMessage(msg.from.id, s);
			}
		});

		
bot.onText(/^([a-zA-Z])/, function(msg, match){
			if(s == "What is your gender ?"){
				s = "What is the name of your school ?"
				_gender = match.input;
				bot.sendMessage(msg.from.id, s);
			}
		});


bot.onText(/^[a-zA-Z]{3,} [a-zA-Z]{5,}( [a-zA-Z]{5,})?/, function(msg, match){
			if(s == "What is the name of your school ?"){
				s = "What is the name of your university ? if not send \"n\""
				_school = match.input;
				bot.sendMessage(msg.from.id, s);
			}
		});

		
bot.on('message', function(msg){
			if(s == "What is the name of your university ? if not send \"n\"" && _uni == null) {
				s = "What do you work in ? if not send \"n\".\n\nExample:(Web developement, Marketing, Accounting, etc..)"
				_uni = msg.text;
				bot.sendMessage(msg.from.id, s);
			}
			else if(s == "What do you work in ? if not send \"n\".\n\nExample:(Web developement, Marketing, Accounting, etc..)" && StringCheck(_uni)){
				_work = msg.text
				_school = (_school.length == 1 && 'N' || 'n')?'none':_school.tocapitalize();
				_uni = (_uni.length == 1 && 'N' || 'n')?'none':_uni;
				_work = (_work.length == 1 && 'N' || 'n')?'none':_work;
				
				_name = _name.toUpperCase();
				_gender = _gender.slice(0,1)
				_gender = _gender.toUpperCase();
				
				let data = {
					'Person Info':[{
						'name':_name,
						'year':_year,
						'gender':_gender,
						'school':_school,
						'university':_uni,
						'work':_work,
					}]
				}
				
				global.o = {}
				o[msg.from.id] = []
				o[msg.from.id].push(data);			
				
				var jsonData = JSON.stringify(o);
				
				const fs = require("fs");
				fs.appendFile("gamerstats.json", jsonData, (err) => {
					  if (err) {
						console.log(err);
					  }
					  console.log(o)
					});
				
				const opts = {
				reply_markup: {
				  inline_keyboard: [
					[
						{
							text: 'Ok',
							callback_data: 'ok2'
						}
					]
				  ]
				}
			  };
				bot.sendMessage(msg.from.id, "Now onto the second phase of the survey, Games! click ok to continue", opts)
				bot.on("callback_query", function(ans) {
					if(ans.data == 'ok2'){
						func.platform(bot,ans);	
					}	
				});
			}				
		});	


		//Games
		

bot.on('callback_query', function (ans) {
				if(ans.data == 'pc' || ans.data == 'console' || ans.data == 'mobile'){
					
				global.plat = ans.data;
				func.category(bot,ans);
				}
		});	
		
bot.on('callback_query', function (ans) {
				if(ans.data == 'moba' || ans.data == 'fight' || ans.data == 'adv' || ans.data == 'moba' || ans.data == 'shoot' || ans.data == 'puzzle')
				{
						
					global.cat = ans.data;
					//Cleaning variables..
					
					cat = (cat == 'moba')?'MOBA':(cat == 'fight')?'Fighting Game':(cat == 'shoot')?'Shooting Game':(cat == 'puzzle')?'Puzzles':(cat == 'adv')?'Adventure':null
					plat = (plat == 'pc')?'PC':(plat == 'console')?'Console':(plat == 'mobile')?'Mobile':null
					
					if(cat == 'MOBA') bot.sendMessage(ans.from.id, "If you like moba, please check out League of Legends, a more faster paced, better version of DOTA 2.\nCheck out this link  and join this group")
					
					//Gathering Data..
					
					console.log('gathering data')
					let data = {
							'Games':[{
								'platform':plat,
								'category':cat
							}]
						};
				
					o[ans.from.id].push(data);	
					
					jsonData = JSON.stringify(o);
					
					const fs2 = require("fs");
					fs2.appendFile("gamerstats.json", jsonData, (err) => {
					  if (err) {
						console.log(err);
					  }
					});
					
					console.log("complete creation")
					
					
					
					const opts = {
						reply_markup: {
						  inline_keyboard: [
							[
								{
									text: 'Ok',
									callback_data: 'ok3'
								}
							]
						  ]
						}
					  };
					 
					bot.sendMessage(ans.from.id, "Onto the last phase, Gamer's Environment?", opts);
					}
				
			});
			
bot.on('callback_query', function(msg) {
				if(msg.data == 'ok3'){
					func.ownPlatform(bot,msg);
					console.log("completed func exec")
				}
				else if(msg.data == 'yes' || msg.data == 'no'){
					ownPlat = msg.data;	
					func.typeOfGamer(bot,msg);
				}
				else if(msg.data == 'Heavy' || msg.data == 'Occasionial'|| msg.data == 'Casual'){
					tog = msg.data;
					func.socialGamer(bot,msg);
				}
				else if(msg.data == 'Social Gamer' || msg.data == 'Loner Gamer'){					
					socialG = msg.data;
					func.gameTalk(bot,msg);
				}
				else if(msg.data == 'yes3' || msg.data == 'no3'){	
					gametalk = msg.data;
					gametalk = gametalk.replace(/[0-9]/, '')
					gametalk = (gametalk == 'yes')?true:false
					
					
					//Gathering Data..
					
					console.log('gathering data')
					let data = {
							'Gamers Environment':[{
								'platform':ownPlat,
								'social gamer':socialG
							}]
						};
				
					o[msg.from.id].push(data);	

					console.log("making o object")
					
					jsonData = JSON.stringify(o);
					
					console.log("creating fs2")
					
					const fs3 = require("fs");
					fs3.appendFile("gamerstats.json", jsonData, (err) => {
					  if (err) {
						console.log(err);
					  }
					  console.log(o)
					});
					
					console.log("complete creation")
					
					bot.sendMessage(msg.from.id, "Thank you for completing the survey, with this information we can be able to host game tournaments");
				}		
					
});


