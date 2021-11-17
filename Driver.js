
'use strict';

const io = require('socket.io-client');
const host = 'http://localhost:3001/caps';
const fireConnect = io.connect(host);

fireConnect.on('allPickup')
fireConnect.on('allTransit')


fireConnect.on('pickup', (order) => {
    fireConnect.emit('gotThePickup', order)
    setTimeout(() => {
        console.log(`DRIVER: picked up ${order.orderID}`);
        fireConnect.emit('in-transit', order)
    }, 1500)
})
    fireConnect.on('in-transit', (payload) => {
        fireConnect.emit('gotItIn-transit', payload)
        setTimeout(() => {
            console.log(`DRIVER: delivered up ${payload.orderID}`);
            fireConnect.emit('delivered', payload)
        }, 2500)
    });


