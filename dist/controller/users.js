"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateuser = exports.deleteauser = exports.getallusers = void 0;
const users_1 = require("../db/users");
const getallusers = async (req, res) => {
    try {
        const users = await (0, users_1.getUsers)();
        return res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.getallusers = getallusers;
const deleteauser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteduser = await (0, users_1.deleteuserbyid)(id);
        return res.json(deleteduser);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.deleteauser = deleteauser;
const updateuser = async (req, res) => {
    try {
        const { id } = req.params;
        const { todo } = req.body;
        if (!todo) {
            return res.sendStatus(400);
        }
        const user = await (0, users_1.getuserByid)(id);
        user.todo = todo;
        await user.save();
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.updateuser = updateuser;
//# sourceMappingURL=users.js.map