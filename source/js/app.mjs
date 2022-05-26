import Slider from "./slider.mjs"

const slider = document.querySelector(".slider")

let s = new Slider({
    itemsContainer:         slider.querySelector(".slider__items"),
    items:                  slider.querySelectorAll(".slider__item"), 
    indicators:             slider.querySelectorAll(".slider__indicator"), 
    activeIndicatorClass:   "slider__indicator_active",
    activeItemClass:        "slider__item_active", 
    autoslide:              30,
    clickableIndicators:    true,
    swipes:                 true
})