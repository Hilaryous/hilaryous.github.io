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

const animateFromTop = (item) => {
  item.classList.add('animate-from-top')
  window.setTimeout(
    () => {
      item.classList.remove('animate-from-top')
    },
    1000
  )
}

const switchColorForItem = (color) => (item, index=0) => {
  const classListArr = nodeListToArray(item.classList)
  const oldColorToken = classListArr.slice(-2)[index]
  if (!classListArr.includes(color)) {
    setTimeout(() => item.classList.replace(oldColorToken, color), 500)
  }
}

const switchColorToGreen = switchColorForItem('green')
const switchColorToDarkPink = switchColorForItem('dark-pink')
const switchColorToYellow = switchColorForItem('yellow')
const switchColorToPink = switchColorForItem('pink')
const switchColorToBlue = switchColorForItem('blue')

const COLOR_SWITCHERS_ARR = [
  {
    selector: SELECT.YELLOW_COLOR_CHANGER,
    toColorFn: switchColorToGreen,
    toBgColorFn: switchColorToYellow,
  },
  {
    selector: SELECT.BLUE_COLOR_CHANGER,
    toColorFn: switchColorToDarkPink,
    toBgColorFn: switchColorToBlue,
  },
  {
    selector: SELECT.DARK_PINK_COLOR_CHANGER,
    toColorFn: switchColorToYellow,
    toBgColorFn: switchColorToDarkPink,
  },
  {
    selector: SELECT.PINK_COLOR_CHANGER,
    toColorFn: switchColorToGreen,
    toBgColorFn: switchColorToPink,
  },
]

COLOR_SWITCHERS_ARR.map((obj) => {
  el(obj.selector).addEventListener('click', (e) => {
    elAll(SELECT.LINK).forEach((item) => {
      animateFromTop(item)
      obj.toColorFn(item)
    })
    obj.toBgColorFn(el(SELECT.BACKGROUND), 1)
  })
})
