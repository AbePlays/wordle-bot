const { isToday } = require('./isToday')
const { jsonReader } = require('./jsonReader')
const { jsonWriter } = require('./jsonWriter')
const { getRandomNumberInRange } = require('./randomNumberInRange')
const {
  getRandomStringFromCollection,
} = require('./randomElementFromCollection')

module.exports = {
  isToday,
  jsonReader,
  jsonWriter,
  getRandomNumberInRange,
  getRandomStringFromCollection,
}
