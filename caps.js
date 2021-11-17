'use strict';
require('dotenv').config()
const PORT = process.env.PORT || 3001;
const caps = require('socket.io')(PORT);
const capsNS = caps.of('/caps');
const msgQueue = {
    pickUpData: {},
    inTransitData: {},
    deliveredData: {}
};

capsNS.on('connection', (socket) => {
    console.log('CONNECTED', socket.id);
    socket.on('pickup', (payload) => {
        msgQueue.pickUpData[payload.orderID] = payload
        console.log('event', {
            event: 'pickup',
            time: new Date(),
            payload: payload
        });
        capsNS.emit('pickup', payload);
    })
    socket.on('gotThePickup', (payload) => {
        console.log('deleting rn', msgQueue)
        delete msgQueue.pickUpData[payload.orderID]
        console.log('well done its deleted', msgQueue)
    })
    
    socket.on('in-transit', (payload) => {
        msgQueue.inTransitData[payload.orderID] = payload
        console.log({
            event: 'in-transit',
            time: new Date(),
            payload: payload
        });
        capsNS.emit('in-transit', payload)
    })
    
    socket.on('gotItIn-transit', (payload) => {
        console.log('transit is deleting rn', msgQueue)
        delete msgQueue.inTransitData[payload.orderID]
        console.log('well done its deleted', msgQueue)
    })

    socket.on('delivered', (payload) => {
        msgQueue.deliveredData[payload.orderID] = payload
        console.log({
            event: 'delivered',
            time: new Date(),
            payload: payload
        });
        capsNS.emit('delivered', payload)

    })
    socket.on('allDelivered', (payload) => {
        console.log('deleting rn', msgQueue)
        delete msgQueue.deliveredData[payload.orderID]
        console.log('well done its deleted', msgQueue)
    })

    socket.on('allPickup',() => {
        console.log('all the pickups')
        Object.keys(msgQueue.pickUpData).forEach(id => {
            socket.emit('pickup', msgQueue.pickUpData[id]);
        })

    })
    socket.on('allTransit',() => {
        console.log('all the Transit')
        Object.keys(msgQueue.inTransitData).forEach(id => {
            socket.emit('in-transit', msgQueue.inTransitData[id]);
        })
    })
    
    socket.on('getAllDelivered',() => {
        console.log('getAllDelivered')
        Object.keys(msgQueue.deliveredData).forEach(id => {
            socket.emit('delivered', msgQueue.deliveredData[id]);
     })
    })
})
