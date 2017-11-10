const Spark = require('../main.js')
const emitter = new Spark()


describe('spark.on() && spark.emit()', () => {

    test('This should emit a message and send a object with a property msg', () => {
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
    
    test('This should get back multipule peieces of payload', () => {
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

describe('spark.all()', () => {
    
    test('This should also get a emitter message', () => {
        emitter.on('hello', msg => msg)
        emitter.on('is-ES6-here', (str, bool) => {
            const NPMpackage = str.split('+')[0]

            expect(NPMpackage).toBe('babel')
            expect(bool).toBeFalsy()
        })
        emitter.on('no-work-today', bool => {
            expect(bool).toBeFalsy()
        })
        
        emitter.all(['hello', 'no-work-today'], (msg) => {
            expect(msg).not.toBeUndefined()
        })

        emitter.all('*', msg => {
            console.log(`msg: ${msg}`)
            expect(msg).not.toBeUndefined()
        })
        
        emitter.emit('hello', 'goodbye')
        emitter.emit('no-work-today', false)
        emitter.emit('is-ES6-here', 'babel+webpack', false)
    })
})

describe('spark.slince()', () => {
    
    test('This should remove the trigger the emitter', () => {
        emitter.on('hello', (msg) => {
            expect(msg).toBeUndefined()
        })

        emitter.slince('hello')

        emitter.emit('hello', "This should not wwork")
    })
})

describe('spark.once()', () => {
    
    test('This should only get one emitt the trigger the emitter', () => {
        emitter.on('hello', msg => {
            let count = 0;

            count++
            if (count === 1) {
                expect(msg).toBe('This should work')
            } else {
                expect().toThrowError()
            }
        })

        emitter.emit('hello', "This should work")
        
        emitter.slince('hello')

        emitter.emit('hello', "This should not work")
    })
})