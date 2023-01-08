const { Telegraf } = require('telegraf')
require('dotenv').config()

const { words } = require('./data/five-letter-words')
const { goodLuckMessages } = require('./data/good-luck-messages')
const {
  getRandomStringFromCollection,
  isToday,
  jsonReader,
  jsonWriter,
} = require('./utils')

const bot = new Telegraf(process.env.BOT_TOKEN)
const DB_URL = 'src/data/db.json'

// /start
bot.start((ctx) => {
  const message =
    'Hello! My name is Word Wizard, and I am here to assist you with your daily Wordle Challenge. To get started, simply enter the command /word and I will provide you with the starting word for your Wordle.'
  ctx.sendMessage(message)
})

// /word
bot.command('word', (ctx) => {
  try {
    const userName = ctx.update.message.from.username
    // 1. Read current saved data from db
    jsonReader(DB_URL, async (error, data) => {
      if (error) throw error
      const savedDate = new Date(data['created_at'])
      // 2. Only one word every day
      if (isToday(savedDate)) {
        await ctx.sendMessage(
          `The starting word for today, ${data.word.toUpperCase()}, has already been created by @${userName}.`
        )
        await ctx.sendMessage(data.message)
      } else {
        // 3. Find a random word and message
        const word = getRandomStringFromCollection(words)
        const message = getRandomStringFromCollection(goodLuckMessages)
        const newDbEntry = JSON.stringify({
          created_at: new Date().toISOString(),
          created_by: userName,
          message,
          word,
        })
        // 4. Save it in db
        jsonWriter(DB_URL, newDbEntry, async (error) => {
          if (error) throw error
          await ctx.sendMessage('Here is your word ⬇️')
          await ctx.sendMessage(word)
          await ctx.sendMessage(message)
        })
      }
    })
  } catch (error) {
    console.error(error)
    ctx.sendMessage('⚠️ Something went wrong. Please try again later.')
  }
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
