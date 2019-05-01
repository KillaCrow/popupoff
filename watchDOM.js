'use strict';

var dom_observer
var dom_observer_new 

function domWatcherHard() {
	dom_observer = new MutationObserver(function(mutation) {
		mutation.forEach(function(mutation) {
			checkElemForPositionHard(mutation.target)
			mutation.addedNodes.forEach(function(element) {
				if (element.nodeName != '#text') checkElemForPositionHard(element)
			})
			removeOverflow()
		})
			
	}) 

	dom_observer_new = new MutationObserver(function(mutation) {
		mutation.forEach(function(mutation) {
			removeOverflow()
		})
	})

	if (!window.location.href.includes('pinterest')) {
		dom_observer.observe(document.documentElement, { 
			childList: true, 
			subtree: true, 
			attributes: true,
			attributeFilter: ['style']
		})
	} else {
		dom_observer_new.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['style']
		})
		dom_observer_new.observe(document.body, {
			attributes: true,
			attributeFilter: ['style']
		})
	}
}

domWatcherHard()

function checkElemForPositionHard(element) {
	let elems = element.querySelectorAll("*")
	let len = elems.length

	for (let i=0; i<len; i++) {

	    if ((window.getComputedStyle(elems[i], null).getPropertyValue('position') == 'fixed') || 
	    	(window.getComputedStyle(elems[i], null).getPropertyValue('position') == 'sticky')) {
	        if (window.getComputedStyle(elems[i], null).getPropertyValue('display') != 'none') {
	        	// setting uniq data-atr to elems with display block as initial state to restore it later
	        	elems[i].setAttribute('data-fixedElementWhoWasRemoveButCouldBeRestoredOneTime', 'UFoundMeHelloThere')
	        }
	        elems[i].style.setProperty("display", "none", "important")
	    }

	}
}

function removeOverflow() {
    if (window.getComputedStyle(document.documentElement, null).getPropertyValue('overflow-y') == 'hidden') {
		document.documentElement.style.setProperty("overflow-y", "auto", "important")
	}

	if (window.getComputedStyle(document.body, null).getPropertyValue('overflow-y') == 'hidden') {
		document.body.style.setProperty("overflow-y", "auto", "important")
	}
}