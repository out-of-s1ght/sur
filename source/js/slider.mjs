class Slider {
    constructor(options) {
        const opts = Object.assign({}, { 
            itemsContainer:       undefined, 
            items:                undefined, 
            indicators:           undefined, 
            activeIndicatorClass: undefined, 
            current:              0, 
            autoslide:            undefined,
            swipes:               false,
            clickableIndicators:  false}, options)

        const resize = () => {this.itemsContainer.style.height = `${this.items[this.current].clientHeight}px`}

        this.itemsContainer = opts.itemsContainer
        this.items = opts.items
        this.indicators = opts.indicators
        this.current = opts.current
        this.activeItemClass = opts.activeItemClass
        this.activeIndicatorClass = opts.activeIndicatorClass
        this.autoslideId = Infinity
        
        window.addEventListener("load", resize)
        window.addEventListener("resize", resize)
        
        if (this.indicators && opts.clickableIndicators) {
            for (let indicator of this.indicators)
                indicator.addEventListener("click", ev => {
                    let index = -1
                    this.indicators.forEach((ind, idx) => { if (indicator === ind) index = idx });
                    if (index < 0) 
                        throw new RangeError()
                    const prev = this.current
                    this.current = index
                    this.showCurrent(prev)
            })
        }

        // TODO:
        if (opts.swipes) {
            
        }

        this.showCurrent()
        this.setAutoslide(opts.autoslide)
    }

    setAutoslide(sec) {
        if (isFinite(this.autoslideId)) {
            clearInterval(this.autoslideId)
            this.autoslideId = Infinity
        }
        if (isFinite(sec) && sec > 0) {
            this.autoslide = sec * 1000
            this.autoslideId = setInterval(() => this.next(), this.autoslide)
        }
    }

    showCurrent(prev = -1) {
        const current = this.current
        const items = this.items
        
        if (current < 0 || current >= items.length)
            throw new RangeError()

        const item = items[current]
        const activeItemClass = this.activeItemClass

        if (prev > -1)
            items[prev].classList.remove(activeItemClass)

        item.classList.add(activeItemClass)

        const indicators = this.indicators
        const activeIndicatorClass = this.activeIndicatorClass

        if (!indicators)
            return

        if (!activeIndicatorClass) 
            throw new Error()
        
        if (current > indicators.length)
            throw new RangeError()
        
        if (prev > -1)
            indicators[prev].classList.remove(activeIndicatorClass)

        const active = indicators[current]

        active.classList.add(activeIndicatorClass)
    }

    next() {
        const prev = this.current

        if (++this.current >= this.items.length)
            this.current = 0

        this.showCurrent(prev)
        
    }

    prev() {
        const prev = this.current

        if (--this.current < 0) 
            this.current = this.items.length - 1
        
        this.showCurrent(prev)
    }
}

export default Slider;