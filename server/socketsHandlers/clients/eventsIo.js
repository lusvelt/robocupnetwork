const _ = require('lodash');
const Event = require('../../models/Event');
const Category = require('../../models/Category');
const log = require('../../config/consoleMessageConfig');

const eventsIo = (clientsIo, socket, room) => {

    const createEventInCategory = async (data, callback) => {
        const _event = data.event;
        const _category = data.category;
        try {
            const event = await Event.create(_event);
            if (!event)
                throw new Error();

            const promises = [];
            
            Category.findById(_category.id)
                .then(category => category.addEvent(event));

            const result = await Promise.all(promises);

            callback(event);
            socket.broadcast.emit('createEvent', {event, _category});
            log.verbose('Event created');
        } catch (err) {
            callback(new Error());
        }
    };

    const getEventsInCategory = async (category ,callback) => {
        try {
            id = category.id;
            Category.findById(id)
                .then(category => category.getEvents({include: [{ 
                    model: Event,
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                }]}))
                .then(events => callback(events));
            log.verbose('Events request');
        } catch (err) {
            callback(new Error());
        }
    };

    const editEvent = async (data, callback) => {
        try {
            console.log(data);
            const _event = data.event;
            const _category = data.category;
            const id = _event.id;
            const event = _.omit(_event, ['id']);
            const result = await Event.update(event, {
                where: {
                    id
                }
            });
            if (!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('editEvent', {_event, _category});
            log.verbose('Event modified');
        } catch (err) {
            callback(new Error());
        }
    };

    const removeEvent = async (data, callback) => {
        try {
            const _event = data.event;
            const _category = data.category;
            const id = _event.id;
            const result = await Event.destroy({
                where: {
                    id
                }
            });
            if (!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('removeEvent', {_event,_category});
            log.verbose('Event removed');
        } catch (err) {
            callback(new Error());
        }
    };

    const updateEventsInEvent = async (data, callback) => {
        try {
            const _event = data.event;
            const _eventToUpdate = data.eventToUpdate;
            const id = _event.id;
            const event = await Event.findById(id);
            const promises = [];
            _eventToUpdate.forEach(toUpdate => {
                promises.push(new Promise((resolve, reject) => {
                    Event.findById(toUpdate.id)
                    .then(ev => {
                        if(toUpdate.selected)
                            return event.addEvent(ev);
                        else
                            return event.removeEvent(ev);    
                    })
                    .then(result => resolve(result))
                    .catch(err => reject(err));
                }));
            });

            const result = await Promise.all(promises);
            callback(result);

        } catch (err) {
            callback(new Error());
        }
    }

    socket.on('createEventInCategory', createEventInCategory);
    socket.on('removeEvent', removeEvent);
    socket.on('getEventsInCategory', getEventsInCategory);
    socket.on('editEvent', editEvent);
    socket.on('updateEventsInEvent',updateEventsInEvent);
};

module.exports = eventsIo;
