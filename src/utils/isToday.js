function isToday(date) {
  const today = new Date()
  const diffDays = today.getDate() - date.getDate()
  const diffMonths = today.getMonth() - date.getMonth()
  const diffYears = today.getFullYear() - date.getFullYear()

  if (diffYears === 0 && diffDays === 0 && diffMonths === 0) {
    return true
  }
  return false
}

module.exports = { isToday }
