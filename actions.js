'use strict';
const events= require('./events');
require('./Vendor')
require('./Driver')


 events.on('pickup',pickup)
 function pickup(payload) {
    console.log('order');
    console.log({
              event: 'pickup',
              time: new Date(),
              payload : payload
          });
  }
  
  events.on('in-transit',inTransit)
  function inTransit(payload) {
    console.log({
              event: 'in-transit',
              time: new Date(),
              payload: payload
          });
  }
  
  
  let delivered=(payload) =>{
      console.log({
          event: 'delivered',
          time: new Date(),
          payload: payload
        });
        
    }
    events.on('delivered',delivered)