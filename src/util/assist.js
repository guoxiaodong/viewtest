// 判断参数是否是其中之一
export function oneOf (value, validList) {
    for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true
        }
    }
    return false
}

export function camelcaseToHyphen (str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

// For Modal scrollBar hidden
let cached
export function getScrollBarSize (fresh) {
    if (fresh || cached === undefined) {
        const inner = document.createElement('div')
        inner.style.width = '100%'
        inner.style.height = '200px'

        const outer = document.createElement('div')
        const outerStyle = outer.style

        outerStyle.position = 'absolute'
        outerStyle.top = 0
        outerStyle.left = 0
        outerStyle.pointerEvents = 'none'
        outerStyle.visibility = 'hidden'
        outerStyle.width = '200px'
        outerStyle.height = '150px'
        outerStyle.overflow = 'hidden'

        outer.appendChild(inner)

        document.body.appendChild(outer)

        const widthContained = inner.offsetWidth
        outer.style.overflow = 'scroll'
        let widthScroll = inner.offsetWidth

        if (widthContained === widthScroll) {
            widthScroll = outer.clientWidth
        }

        document.body.removeChild(outer)

        cached = widthContained - widthScroll
    }
    return cached
}

// firstUpperCase
function firstUpperCase (str) {
    return str.toString()[0].toUpperCase() + str.toString().slice(1)
}
export {firstUpperCase}

// Warn
export function warnProp (component, prop, correctType, wrongType) {
    correctType = firstUpperCase(correctType)
    wrongType = firstUpperCase(wrongType)
    console.error(`[iView warn]: Invalid prop: type check failed for prop ${prop}. Expected ${correctType}, got ${wrongType}. (found in component: ${component})`);    // eslint-disable-line
}

function typeOf (obj) {
    const toString = Object.prototype.toString
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    }
    return map[toString.call(obj)]
}

// deepCopy
function deepCopy (data) {
    const t = typeOf(data)
    let o

    if (t === 'array') {
        o = []
    } else if (t === 'object') {
        o = {}
    } else {
        return data
    }

    if (t === 'array') {
        for (let i = 0; i < data.length; i++) {
            o.push(deepCopy(data[i]))
        }
    } else if (t === 'object') {
        for (let i in data) {
            o[i] = deepCopy(data[i])
        }
    }
    return o
}

export {deepCopy}

// scrollTop animation
export function scrollTop (el, from = 0, to, duration = 500) {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 1000 / 60)
            }
        )
    }
    const difference = Math.abs(from - to)
    const step = Math.ceil(difference / duration * 50)

    function scroll (start, end, step) {
        if (start === end) return

        let d = (start + step > end) ? end : start + step
        if (start > end) {
            d = (start - step < end) ? end : start - step
        }

        if (el === window) {
            window.scrollTo(d, d)
        } else {
            el.scrollTop = d
        }
        window.requestAnimationFrame(() => scroll(d, end, step))
    }
    scroll(from, to, step)
}

// Find components upward
function findComponentUpward (context, componentName, componentNames) {
    if (typeof componentName === 'string') {
        componentNames = [componentName]
    } else {
        componentNames = componentName
    }

    let parent = context.$parent
    let name = parent.$options.name
    while (parent && (!name || componentNames.indexOf(name) < 0)) {
        parent = parent.$parent
        if (parent) name = parent.$options.name
    }
    return parent
}
export {findComponentUpward}

// Find component downward
function findComponentDownward (context, componentName) {
    const childrens = context.$children
    let children = null

    if (childrens.length) {
        childrens.forEach(child => {
            const name = child.$options.name
            if (name === componentName) {
                children = child
            }
        })

        for (let i = 0; i < childrens.length; i++) {
            const child = childrens[i]
            const name = child.$options.name
            if (name === componentName) {
                children = child
                break
            } else {
                children = findComponentDownward(child, componentName)
                if (children) break
            }
        }
    }
    return children
}
export {findComponentDownward}

// Find components downward
function findComponentsDownward (context, componentName, components = []) {
    const childrens = context.$children

    if (childrens.length) {
        childrens.forEach(child => {
            const name = child.$options.name
            const childs = child.$children

            if (name === componentName) components.push(child)
            if (childs.length) {
                const findChilds = findComponentsDownward(child, componentName, components)
                if (findChilds) components.concat(findChilds)
            }
        })
    }
    return components
}
export {findComponentsDownward}

function hasClass (obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}
export {hasClass}

function addClass (obj, cls) {
    if (!this.hasClass(obj, cls)) {
        obj.className += ' ' + cls
    }
}
export {addClass}

function removeClass (obj, cls) {
    if (hasClass(obj, cls)) {
        let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
        obj.className = obj.className.replace(reg, ' ')
    }
}
export {removeClass}

function removeAllClass (objs, cls) {
    for (let obj of objs) {
        if (hasClass(obj, cls)) {
            let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
            obj.className = obj.className.replace(reg, ' ')
        }
    }
}
export {removeAllClass}

function formatDate (date) {
    let myyear = date.getFullYear()
    let mymonth = date.getMonth() + 1
    let myweekday = date.getDate()

    if (mymonth < 10) {
        mymonth = '0' + mymonth
    }
    if (myweekday < 10) {
        myweekday = '0' + myweekday
    }
    return (myyear + '-' + mymonth + '-' + myweekday)
}

export {formatDate}

function getWeekStartDate () {
    let now = new Date() // 当前日期
    let nowDayOfWeek = now.getDay() - 1 // 今天本周的第几天
    let nowDay = now.getDate() // 当前日
    let nowMonth = now.getMonth() // 当前月
    let nowYear = now.getYear() // 当前年
    nowYear += (nowYear < 2000) ? 1900 : 0 //
    let weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek)
    return formatDate(weekStartDate)
}

export {getWeekStartDate}

function getMonthStartDate () {
    let now = new Date() // 当前日期
    let nowMonth = now.getMonth() // 当前月
    let nowYear = now.getYear() // 当前年
    nowYear += (nowYear < 2000) ? 1900 : 0 //
    let monthStartDate = new Date(nowYear, nowMonth, 1)
    return formatDate(monthStartDate)
}

export {getMonthStartDate}

function getTodayDate () {
    let now = new Date() // 当前日期
    return formatDate(now)
}

export {getTodayDate}

function getAfterDay (date) {
    let nowDay = date.getDate() // 当前日
    let nowMonth = date.getMonth() // 当前月
    let nowYear = date.getYear() // 当前年
    nowYear += (nowYear < 2000) ? 1900 : 0 //
    let MonthDate = new Date(nowYear, nowMonth, nowDay + 1)
    return formatDate(MonthDate)
}

export {getAfterDay}

function getBeforeDay (date) {
    let nowDay = date.getDate() // 当前日
    let nowMonth = date.getMonth() // 当前月
    let nowYear = date.getYear() // 当前年
    nowYear += (nowYear < 2000) ? 1900 : 0 //
    let MonthDate = new Date(nowYear, nowMonth, nowDay - 1)
    return formatDate(MonthDate)
}

export {getBeforeDay}

function getAfterMonth (date) {
    let nowDay = date.getDate() // 当前日
    let nowMonth = date.getMonth() // 当前月
    let nowYear = date.getYear() // 当前年
    nowYear += (nowYear < 2000) ? 1900 : 0 //
    let MonthDate = new Date(nowYear, nowMonth + 1, nowDay)
    return formatDate(MonthDate)
}

export {getAfterMonth}

function getAfterQuarter (date) {
    let nowDay = date.getDate() // 当前日
    let nowMonth = date.getMonth() // 当前月
    let nowYear = date.getYear() // 当前年
    nowYear += (nowYear < 2000) ? 1900 : 0 //
    let MonthDate = new Date(nowYear, nowMonth + 3, nowDay)
    return formatDate(MonthDate)
}

export {getAfterQuarter}

function getAfterYear (date) {
    let nowDay = date.getDate() // 当前日
    let nowMonth = date.getMonth() // 当前月
    let nowYear = date.getYear() // 当前年
    nowYear += (nowYear < 2000) ? 1900 : 0 //
    let MonthDate = new Date(nowYear + 1, nowMonth, nowDay)
    return formatDate(MonthDate)
}

export {getAfterYear}

function InsertID (str, id, msg = 'id') { // 就能替换一个
    return str.replace('{' + msg + '}', id)
}

export {InsertID}// 替换id
