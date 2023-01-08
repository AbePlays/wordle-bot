const { getRandomNumberInRange } = require('./randomNumberInRange')

function getRandomStringFromCollection(data) {
  const totalRecords = data.length
  const randomIndex = getRandomNumberInRange(0, totalRecords - 1)
  return data[randomIndex]
}

module.exports = { getRandomStringFromCollection }
