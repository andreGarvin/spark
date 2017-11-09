class Spark {

    constructor() {
        this.events = {};
    }

    emit(event, payload) {
        payload = Array.from(arguments).slice(1)
        if (this.events[event]) {
            this.events[event](...payload)
            
            if (this.events['*'] && this.events['*'].events.includes(event)) {
                return this.events['*'].action(...payload)
            }
        }
    }

    on(event, action) {
        if (event && action) {
            if (typeof action === 'function' || typeof action === 'object') {
                return this.events[event] = action;
            }
        }
    }

    all(events, action) {
        if (Array.isArray(events)) {
            return this.on('*', {
                events,
                action
            })
        } else if (events === '*') {
            return this.on('*', {
                events: ['*'],
                action
            })
        }
    }

    slince(event) {
        return this.events[event] ? delete this.events[event] : undefined;
    }

    once(event, action) {
        this.on(...arguments)
        return this.slince(event)
    }
}

module.exports = Spark;