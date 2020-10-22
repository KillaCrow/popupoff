var domObserver
var domObserverLight

var infiniteLoopPreventCounter = 0
var myTimer = 0
var wasNotStoped = true

// questionable
const memoize = {}
setInterval(() => {
	console.log(memoize)
}, 5000)

const autoMode = (statsEnabled, shouldRestoreCont) => {
	// state
	let state = statsEnabled ? {
		windowArea: parseFloat(window.innerHeight * window.innerWidth),
		cleanedArea: 0,
		numbOfItems: 0,
		restored: 0
	} : null

	// unmutable
	const doc = document.documentElement
	const body = document.body
	const elems = body.getElementsByTagName("*")

	const roundToTwo = num =>
		+(Math.round(num + "e+2")  + "e-2")

	const videoCheck = element => true

	// methods
	const positionCheck = element => {
		// if (element.getAttribute('data-PopUpOFF') === 'bl') {
		// 	// questionable
		// 	console.log('repeat')
		// 	return true
		// }

		if (element.offsetHeight === 0 || element.offsetWidth === 0) {
			console.warn('Zero')
			return true
		}

        const layoutArea = element.offsetHeight * element.offsetWidth
		const screenValue = roundToTwo(layoutArea/state.windowArea)

        // const elemTopStyle = getStyle(element, 'top')
		// const elemBotStyle = getStyle(element, 'bottom')
        // const elemWidthStyle = getStyle(element, 'width')
		// const elemHeightStyle = getStyle(element, 'height')

		const offsetBot = window.innerHeight - (element.offsetTop + element.offsetHeight)

		console.log(element)
        // console.log('elemTopStyle ', elemTopStyle)
		console.log('elemOffsetTop', element.offsetTop)
		console.log('elemOffsetLeft', element.offsetLeft)
        // console.log('elemBotStyle ', elemBotStyle)
		console.log('elemOffsetBot', offsetBot)
		// console.log('elemWidthStyle ', elemWidthStyle)
        console.log('elemOffsetWidth ', element.offsetWidth)
		// console.log('elemHeightStyle ', elemHeightStyle)
		console.log('elemOffsetHeight', element.offsetHeight)
        console.log('layoutArea ', layoutArea)
        console.log('screenValue ', screenValue)

		if (screenValue >= .98) {
			// case 1: overlay on the whole screen - should block
			// case 2: video in full screen mode - should not
			console.warn('Full screen!')
			return videoCheck(element)
		}

		if (element.offsetTop <= 70 && element.offsetHeight <= 200) {
			// it's a header!
			console.warn('Header!')
			return false
		}

		if (element.offsetLeft <= 0 && element.offsetWidth <= 300) {
			// youtube sidebar
			console.warn('SideBar!')
			return false
		}

		if (screenValue < .98 && screenValue >= .1) {
			// overlays
			console.warn('Overlay')
			return true
		}

		if (screenValue <= .03) {
			// buttons and side/social menus
			console.warn('Super small')
			return false
		}

		if (element.offsetHeight >= 160 && element.offsetWidth >= 300) {
			// scrolling videos in the articles
			console.warn('Scrolling video!')
			return true
		}

		if (offsetBot <= 100) {
			// bottom notification
			console.warn('Bottom notification')
			return true
		}

		if (screenValue <= .1) {
			// buttons and side/social menus
			console.warn('nothing special')
			return false
		}

        return true
	}
	const checkElem = element => {
		if (!isDecentElem(element)) return

		const elemPosStyle = getStyle(element, 'position')
	    if ((elemPosStyle == 'fixed') ||
	    	(elemPosStyle == 'sticky')) {

	    	if (element.getAttribute('data-PopUpOFF') === 'notification')
	        	return

	    	// if (getStyle(element, 'display') != 'none') {
	        // 	element.setAttribute('data-popupoffExtension', 'hello')
	        // }
			const elemKey =`${element.offsetWidth}x${element.offsetHeight}`
			const memoized = elemKey in memoize
	    	const shouldRemove = memoized ? memoize[elemKey] : positionCheck(element)

            if (shouldRemove) {
                // if (statsEnabled) state = addItemToStats(element, state)

                setPropImp(element, "display", "none")
				// element.setAttribute('data-PopUpOFF', 'bl')
            }

			if (!memoized)
				memoize[elemKey] = shouldRemove
	    }

	    state = additionalChecks(element, state, statsEnabled, shouldRestoreCont, checkElem)
	}
	// watch DOM
	const prevLoop = () => {
		if (infiniteLoopPreventCounter > 1000) {
			removeDomWatcher(domObserver, wasNotStoped, body, domObserverLight, action)
			return true
		}
		infiniteLoopPreventCounter++
		if (myTimer === 0) {
			myTimer = setTimeout(() => resetLoopCounter(infiniteLoopPreventCounter, myTimer), 1000)
		}
		return false
	}
	const watchDOM = () => {
		if (!domObserver) {
			domObserver = new MutationObserver(mutations => {
				state = watchMutations(mutations, shouldRestoreCont, statsEnabled, state, doc, body, prevLoop, checkElem)
			})
		}

		if (window.location.href.includes('pinterest')) {
			// cant deal with this website, i guess there will be array of this-one-like websites or I find out another solution
			domObserverLight = new MutationObserver(mutation => {
				mutation.map(item => {
					state = removeOverflow(statsEnabled, state, doc, body)
				})
			})
			domObserverLight.observe(doc, {
				attributes: true
			})
			domObserverLight.observe(body, {
				attributes: true
			})
		} else {
			domObserver.observe(doc, {
				childList: true,
				subtree: true,
				attributes: true
			})
		}
	}

	const action = elems => {
		// state = removeOverflow(statsEnabled, state, doc, body)
		checkElems(elems, checkElem)
		// if (shouldRestoreCont)
		// 	state = findHidden(state, statsEnabled, doc)
		watchDOM()
	}

	// Let the hunt begin!
	action(elems)
	// statistics
	// if (statsEnabled) {
	// 	setNewData(state)
	// 	if (!beforeUnloadAactive) {
	// 		window.addEventListener("beforeunload", () => { setNewData(state) })
	// 		beforeUnloadAactive = true
	// 	}
	// }
}

chrome.storage.sync.get(['statsEnabled', 'restoreCont'], resp => {
	autoMode(resp.statsEnabled, resp.restoreCont)
})
