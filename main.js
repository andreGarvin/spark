class Spark {

    constructor() {
        this.events = {};
    }

    emit(event, payload) {
        payload = Array.from(arguments).slice(1)
        if (this.events[event]) {
            this.events[event](...payload)
            
            if (this.events['*'] && this.events['*'].events.includes(event)) {
                this.events['*'].action(...payload)
            }
        }
    }

    on(event, action) {
        if (event && action) {
            if (typeof action === 'function' || typeof action === 'object') {
                this.events[event] = action;
            }
        }
    }

    onAll(events, action) {
        if (Array.isArray(events)) {
            this.on('*', {
                events,
                action
            })
        } else if (events === '*') {
            this.on('*', action)
        }
    }
}

module.exports = Spark;