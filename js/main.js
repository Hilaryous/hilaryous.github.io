const SELECT = Object.freeze({
  BACKGROUND: '.main',
  BLUE_COLOR_CHANGER: '.blue-color-changer',
  DARK_PINK: '.dark-pink',
  DARK_PINK_COLOR_CHANGER: '.dark-pink-color-changer',
  GREEN: '.green',
  LINK: '.link',
  PINK_COLOR_CHANGER: '.pink-color-changer',
  YELLOW: '.yellow',
  YELLOW_COLOR_CHANGER: '.yellow-color-changer',
})

const body = document.body

const elementMap = new Map()

const memoizeElement = selector => (
  elementMap
  .set(selector, document.querySelector(selector))
  .get(selector)
)

const memoizeElementAll = selector => (
  elementMap
  .set(selector, document.querySelectorAll(selector))
  .get(selector)
)

const el = selector => (
  elementMap.get(selector) || memoizeElement(selector)
)

const elAll = selector => (
  elementMap.get(selector) || memoizeElementAll(selector)
)

const nodeListToArray = list => (
  Array.prototype.slice.call(list)
)

const switchColorForItem = (color) => (item) => {
  const classListArr = nodeListToArray(item.classList)
  const oldToken = classListArr.slice(-1)[0]
  if (!classListArr.includes(color)) {
    item.classList.replace(oldToken, color)
  }
}

const switchColorToGreen = switchColorForItem('green')
const switchColorToDarkPink = switchColorForItem('dark-pink')
const switchColorToYellow = switchColorForItem('yellow')
const switchColorToPink = switchColorForItem('pink')
const switchColorToBlue = switchColorForItem('blue')

el(SELECT.YELLOW_COLOR_CHANGER).addEventListener('click', (e) => {
  elAll(SELECT.LINK).forEach((item) => {
    switchColorToGreen(item)
  })
  switchColorToYellow(el(SELECT.BACKGROUND))
})

el(SELECT.BLUE_COLOR_CHANGER).addEventListener('click', (e) => {
  elAll(SELECT.LINK).forEach((item) => {
    switchColorToDarkPink(item)
  })
  switchColorToBlue(el(SELECT.BACKGROUND))
})

el(SELECT.DARK_PINK_COLOR_CHANGER).addEventListener('click', (e) => {
  elAll(SELECT.LINK).forEach((item) => {
    switchColorToYellow(item)
  })
  switchColorToDarkPink(el(SELECT.BACKGROUND))
})

el(SELECT.PINK_COLOR_CHANGER).addEventListener('click', (e) => {
  elAll(SELECT.LINK).forEach((item) => {
    switchColorToGreen(item)
  })
  switchColorToPink(el(SELECT.BACKGROUND))
})
