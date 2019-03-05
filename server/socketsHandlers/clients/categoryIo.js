const _ = require('lodash');
const Category = require('../../models/Category');
const Phase = require('../../models/Phase');
const log = require('../../config/consoleMessageConfig');

const categoryIo = (clientsIo, socket, room) => {

    const createCategory = async (_category, callback) => {
        console.log(_category);
        try {
            const category = await Category.create(_category);
            if (!category)
                throw new Error();
            callback(category);
            socket.broadcast.emit('createCategory', category);
            log.verbose('Category created');
        } catch (err) {
            callback(new Error());
        }
    };

    const getCategories = async (args, callback) => {
        try {
            const category = await Category.getCategoriesList();
            callback(category);
            log.verbose('Categories request');
        } catch (err) {
            callback(new Error());
        }
    };

    const editCategory = async (_category, callback) => {
        try {
            const id = _category.id;
            const category = _.omit(_category, ['id']);
            const result = await Category.update(category, {
                where: {
                    id
                }
            });
            if (!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('editCategory', _category);
            log.verbose('Category modified');
        } catch (err) {
            callback(new Error());
        }
    };

    const removeCategory = async (_category, callback) => {
        try {
            const id = _category.id;
            const result = await Category.destroy({
                where: {
                    id
                }
            });
            if (!result)
                throw new Error();
            callback(result);
            socket.broadcast.emit('removeCategory', _category);
            log.verbose('Category removed');
        } catch (err) {
            callback(new Error());
        }
    };

    const findCategoryFromPhaseId = (data, callback) => {
        try {
            const id = data.id;
            console.log(id);
           Phase.findById(id)
           .then(phase => callback(phase)/*phase.getCategory()*/)
           /*.then(category => {
               console.log(category);
               callback(category)});*/
        } catch (err) {
            callback(new Error());
        }
    };

    socket.on('createCategory', createCategory);
    socket.on('removeCategory', removeCategory);
    socket.on('getCategories', getCategories);
    socket.on('editCategory', editCategory);
    socket.on('findCategoryFromPhaseId',findCategoryFromPhaseId);
};

module.exports = categoryIo;
