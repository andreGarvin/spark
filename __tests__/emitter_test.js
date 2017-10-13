const Spark = require('../main.js')
const emitter = new Spark()


describe('spark.on() && spark.emit()', () => {

    it('This should emit a message and send a object with a property msg', () => {
        emitter.on('hello', (payload) => {
            expect(payload).toEqual({
                msg: "Hello, World"
            })
        })
    
        emitter.emit('hello', {
            msg: "Hello, World"
        })
    })
})

describe('Multipule payload dump', () => {
    
    it('This should get back multipule peieces of payload', () => {
        emitter.on('hello', (obj, int, str, bool) => {
            expect(int).toBeLessThan(2)
            expect(int + str).toBe('1yep')
            expect(bool).toBeTruthy()
        })
    
        emitter.emit('hello', {
            msg: "Hello, World"
        }, 1, "yep", true)
    })
})

describe('spark.onAll()', () => {
    
    it('This should also get a emitter message', () => {
        emitter.on('hello', (msg) => msg)
        emitter.onAll(['hello'], (msg) => {
            expect(msg).toBe('goodbye')
        })
    
        emitter.emit('hello', 'goodbye')
    })
})

