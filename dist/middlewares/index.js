"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isowner = exports.isauthenticated = void 0;
const lodash_1 = require("lodash");
const users_1 = require("../db/users");
const isauthenticated = async (req, res, next) => {
    try {
        const sessionToken = req.cookies['gakiza-api'];
        if (!sessionToken) {
            return res.sendStatus(403);
        }
        const existinguser = await (0, users_1.getuserbySession)(sessionToken);
        if (!existinguser) {
            return res.sendStatus(403);
        }
        (0, lodash_1.merge)(req, { identity: existinguser });
        return next();
    }
    catch (error) {
        console.log(error);
    }
};
exports.isauthenticated = isauthenticated;
const isowner = async (req, res, next) => {
    try {
        const { id } = req.params;
        const curentuserid = (0, lodash_1.get)(req, "identity._id");
        if (!curentuserid) {
            return res.sendStatus(403);
        }
        if (curentuserid.toString() !== id) {
            return res.sendStatus(403);
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.isowner = isowner;
//# sourceMappingURL=index.js.map