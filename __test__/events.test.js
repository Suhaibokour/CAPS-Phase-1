'use strict';
const events = require('../events');
const faker = require('faker');
require('../Vendor')
const customer = faker.name.findName();
const address = faker.address.cityName();
const store = 'flowers';
const orderID = faker.datatype.uuid();
jest.useFakeTimers()
const order = {
    customer: customer,
    address: address,
    store: store,
    orderID: orderID
}
const mockFn = jest.fn();
describe('Logger Middleware', () => {

    let consoleSpy;
    let req = {};
    let res = {};
    let next = jest.fn();


    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });
    test('check if the setInterval function is called', () => {
        let test = setInterval(() => {
            events.emit('pickup', order);
        }, 1000);
        
        events.on('pickup', pickup)
        function pickup(payload) {
            console.log({
                event: 'pickup',
                time: new Date(),
                payload: payload
            });

        }

        setTimeout(() => {
            test
        }, 1000)
  expect(test).toBeTruthy();
});

});