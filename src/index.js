const { Telegraf } = require('telegraf')
require('dotenv').config()

const { words } = require('./five-letter-words')
const { getRandomNumberInRange } = require('./utils/randomNumberInRange')

const bot = new Telegraf(process.env.BOT_TOKEN)

// /start
bot.start((ctx) => {
  const message =
    'Hello! My name is Word Wizard, and I am here to assist you with your daily Wordle Challenge. To get started, simply enter the command /word and I will provide you with the starting word for your Wordle.'
  ctx.sendMessage(message)
})

// /word
bot.command('word', (ctx) => {
  try {
    ctx.sendMessage('Here is your word ⬇️')
    const numberOfWords = words.length
    const randomIndex = getRandomNumberInRange(0, numberOfWords - 1)
    ctx.sendMessage(words[randomIndex])
  } catch (error) {
    console.log('error', error)
    ctx.sendMessage('Something went wrong. Please try again later.')
  }
})

bot.launch()
