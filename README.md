# Spark
Another Javascript event emitter cuse we do not have enough

```bash
npm i @andre_garvin/spark --save
```

### This is same as event emitter for the evenst module in node
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

`on`: Recivces the messages being emitter. `*` will get all messages.
```js
emitter.on('event-name', data => console.log)
```
`emit`: emits messages to a given event name. You can also pass in mulitple arguemnets into the emit method
```js
emitter.emit('event-name', 'event')
emitter.emit('event-name', [1,2,'bar'], { msg: 'hello, wolrd' }, true, foo(), 17329)
```
`once`: This will only receviecs the message once.
<br />
`onAll`: Reives all messages being emitted.
<br />
`slince`: turns off a event from getting message anymore.
```js
emitter.slince('event-name')
```

### To see further examples view the test I set up it is ver helpful to understand most projects