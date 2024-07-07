const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
const axios = require('axios');
require('dotenv').config();

const bot = new Telegraf(process.env.token);

bot.start((ctx) => ctx.reply('Привет, пупсик! Я отправлю тебе любую девочку, которую ты выберешь.'));

bot.help(async (ctx) => {
  ctx.reply(
    '/sfw - отправляет тянку без хентая\n'
    + '/nsfw - отправляет хентай тянку\n'
    + '/neko - отправляет хентай кошкадевочку\n'
    + '/trap - отправляет хентай девочку с подвохом\n'
    + '/blowjob - отправляет хентай девочку с чупачупсом'
  );
});

bot.command('hello', (ctx) => {
  ctx.reply('hello world!');
  console.log('hello world');
});

const getSFWWaifuImage = async (ctx) => {
  try {
    const response = await axios.get('https://api.waifu.pics/sfw/waifu');
    const imageUrl = response.data.url;
    await ctx.replyWithPhoto({ url: imageUrl });
  } catch (error) {
    console.error('Error fetching waifu image:', error);
    await ctx.reply('Извините, произошла ошибка при получении картинки.');
  }
};

const getNSFWWaifuImage = async (ctx, endpoint) => {
  try {
    const response = await axios.get(`https://api.waifu.pics/nsfw/${endpoint}`);
    const imageUrl = response.data.url;
    await ctx.replyWithPhoto({ url: imageUrl });
  } catch (error) {
    console.error('Error fetching waifu image:', error);
    await ctx.reply('Извините, произошла ошибка при получении картинки.');
  }
};

bot.command('sfw', getSFWWaifuImage);
bot.command('nsfw', (ctx) => getNSFWWaifuImage(ctx, 'waifu'));
bot.command('neko', (ctx) => getNSFWWaifuImage(ctx, 'neko'));
bot.command('trap', (ctx) => getNSFWWaifuImage(ctx, 'trap'));
bot.command('blowjob', (ctx) => getNSFWWaifuImage(ctx, 'blowjob'));

console.log('bot started');
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
