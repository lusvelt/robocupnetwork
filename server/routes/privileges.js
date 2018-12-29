const _ = require('lodash');

const ActionType = require('../models/ActionType');

const getActionTypes = async (req, res) => {
    try {
        const actionTypes = await ActionType.getActionTypesList();
        res.send(actionTypes);
    } catch (err) {
        res.send(400);
    }
};

const createActionType = async (req, res) => {
    try {
        const actionType = req.body;
        const result = await ActionType.create(actionType);
        if (!result)
            throw new Error();
        res.send(result);
    } catch (err) {
        res.sendStatus(400);
    }
};

const editActionType = async (req, res) => {
    try {        
        const id = req.body.id;
        const actionType = _.omit(req.body, ['id']);
        const result = await ActionType.update(actionType, { where: { id } });
        if (!result)
            throw new Error();
        res.send(result);
    } catch (err) {
        res.sendStatus(400);
    }
};

const removeActionType = async (req, res) => {
    try {
        const id = req.body.id;
        const result = await ActionType.destroy({ where: { id } });
        if (!result)
            throw new Error();
        res.send();
    } catch (err) {
        res.sendStatus(400);
    }
};

module.exports = {
    getActionTypes,
    createActionType,
    editActionType,
    removeActionType
};