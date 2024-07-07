const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const axios = require("axios");
require("dotenv").config()

const bot = new Telegraf(process.env.token);
bot.start((ctx) => ctx.reply("Привет, пупсик! Я отправлю тебе любую девочку, которую ты выберешь."));
bot.help(async (ctx) => {
    ctx.reply(
      "/sfw - отправляет тянку без хентая\n" +
      "/nsfw - отправляет хентай тянку\n" +
      "/neko - отправляет хентай кошкадевочку\n" +
      "/trap - отправляет хентай девочку с подвохом\n" +
      "/blowjob - отправляет хентай девочку с чупачупсом"
    );
  });
bot.command("hello", (ctx) => {
  ctx.reply("hello world!");
  console.log("hello world");
});
bot.command("sfw", async (ctx) => {
  try {
    const response = await axios.get("https://api.waifu.pics/sfw/waifu");
    const imageUrl = response.data.url;

    await ctx.replyWithPhoto({ url: imageUrl });
  } catch (error) {
    console.error("Error fetching waifu image:", error);
    await ctx.reply("Извините, произошла ошибка при получении картинки.");
  }
});

bot.command("nsfw", async (ctx) => {
  try {
    const response = await axios.get("https://api.waifu.pics/nsfw/waifu");
    const imageUrl = response.data.url;

    await ctx.replyWithPhoto({ url: imageUrl });
  } catch (error) {
    console.error("Error fetching waifu image:", error);
    await ctx.reply("Извините, произошла ошибка при получении картинки.");
  }
});

bot.command("neko", async (ctx) => {
  try {
    const response = await axios.get("https://api.waifu.pics/nsfw/neko");
    const imageUrl = response.data.url;

    await ctx.replyWithPhoto({ url: imageUrl });
  } catch (error) {
    console.error("Error fetching waifu image:", error);
    await ctx.reply("Извините, произошла ошибка при получении картинки.");
  }
});

bot.command("trap", async (ctx) => {
  try {
    const response = await axios.get("https://api.waifu.pics/nsfw/trap");
    const imageUrl = response.data.url;

    await ctx.replyWithPhoto({ url: imageUrl });
  } catch (error) {
    console.error("Error fetching waifu image:", error);
    await ctx.reply("Извините, произошла ошибка при получении картинки.");
  }
});

bot.command("blowjob", async (ctx) => {
  try {
    const response = await axios.get("https://api.waifu.pics/nsfw/blowjob");
    const imageUrl = response.data.url;

    await ctx.replyWithPhoto({ url: imageUrl });
  } catch (error) {
    console.error("Error fetching waifu image:", error);
    await ctx.reply("Извините, произошла ошибка при получении картинки.");
  }
});

console.log("bot started");
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
