# Spark
Another JavaScript event emitter cause we do not have enough.

I really did not have a particular reason for creating this event emitter. I guess the only 'advantage' this emitter has 

```bash
npm i @andre_garvin/spark --save
```

### This is same as event emitter for the 'events' module in node
```js
const spark = require('@andre_garvin/spark')
const emitter = new spark()


emitter.on('message', msg => {
    console.log(msg)
})

emitter.once('crash', err => {
    console.error(err)
})

emitter.emit('message', 'Hello, World!')

emitter.emit('crash', 'There is a error')
```

`on`: receives the messages being emitted.
```js
emitter.on('event-name', data => console.log)
```
`emit`: emits a message or messages to a given event name. You can also pass in multiple arguments be sent to the subscriber of the event that it is being emitted.
```js
emitter.emit('event-name', 'event')
emitter.emit('event-name', [1,2,'bar'], { msg: 'hello, wolrd' }, true, foo(), 17329)
```
`slince`: Turns off a event from receiving messages.
```js
// This will do no more harm to anyone anymore
emitter.silence('@channel')
```
`once`: Same a the `on` method but will only receive the emitted message once.
<br />
`all`: Receives messages from specified event names.
```js
// Pass a array of the event names
emitter.all(['hello', 'foo', 'bar'], msg => {
    console.log(msg)
})

// or you can pass in '*' to get all events
emitter.all('*', msg => {
    foo(msg)
})
```

### To see further examples view the test I set up, I believe sometimes it can be very helpful to understand most projects is by reading the test if the documentation is not up to pare.

## Contributing:
#### Hell the why not ? If I make missing spelling or grammar mistakes go a head send a PR on my mistakes.