class Spark {

    constructor() {
        this.events = {}
    }

    emit(event, payload) {
        payload = Array.from(arguments).slice(1)
        if (this.events[event]) {
            this.events[event].handler(...payload)
            this.emit(`close:${event}`, event)

            if (this.events['__all__']) {
                const _event = this.events['__all__']
                if (_event.event.includes(event)) {
                    _event.handler(...payload)
                }
            }
        } if (event === '*') {
            Object.values(this.events).forEach(e => {
                e.handler(...payload)
            })
        }
    }

    on(event, handler) {
        if (event === '__all__') {
            return this.events['__all__'] = handler
        }

        if (typeof event !== 'string') {
            throw new Error('The event that was event is undefined or is not a string')
        } else if (typeof handler !== 'function') {
            throw new Error('The event handler is not a function')
        }

        return this.events[event] = { handler, event };
    }

    all(events = undefined, handler) {
        if (Array.isArray(events)) {
            events = events.filter(i => Object.keys(this.events).includes(i))
            if (events.length !== 0) {
                return this.on('__all__', { event: events, handler })
            }
        }
        
        if (!events || events === '*') {
            return this.on('*', handler)
        }
    }

    silence(event) {
        return this.events[event] ? delete this.events[event] : undefined;
    }

    once(event, handler) {
        this.on(event, handler)
        this.on(`close:${event}`, event => this.silence(event))
    }
}

module.exports = Spark;