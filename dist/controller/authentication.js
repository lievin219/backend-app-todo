"use strict";
// i tried here to import frame works to be used !!
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const users_1 = require("../db/users");
const helpers_1 = require("../helpers");
//here its the  asynchronoumous function allowing user to login 
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.sendStatus(400);
        }
        const user = await (0, users_1.getuserByEmail)(email).select('+authentication.salt +authentication.password');
        if (!user) {
            return res.sendStatus(400);
        }
        const expectedhash = (0, helpers_1.authentication)(user.authentication.salt, password);
        if (user.authentication.password !== expectedhash) {
            return res.sendStatus(403);
        }
        const salt = (0, helpers_1.random)();
        user.authentication.sessionToken = (0, helpers_1.authentication)(salt, user._id.toString());
        await user.save();
        res.cookie("gakiza-auth", user.authentication.sessionToken, { domain: "localhost", path: "/" });
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.login = login;
//here its the  asynchronoumous function allowing user to  register
const register = async (req, res) => {
    try {
        const { email, password, username, todo, done } = req.body;
        if (!email || !password || !username) {
            return res.sendStatus(400);
        }
        //here if a user already exists via email  there will be a message of a  forbidden
        const existinguser = await (0, users_1.getuserByEmail)(email);
        if (existinguser) {
            return res.sendStatus(400);
        }
        const salt = (0, helpers_1.random)();
        const user = await (0, users_1.createUser)({
            email,
            username,
            todo,
            done,
            authentication: {
                salt,
                password: (0, helpers_1.authentication)(salt, password)
            }
        });
        return res.status(200).json(user).end();
        // this upward return describe that  if ser does not exist he?she wil be  regiistered
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};
exports.register = register;
//# sourceMappingURL=authentication.js.map