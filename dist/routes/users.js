"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../controller/users");
exports.default = (router) => {
    router.get('/users', users_1.getallusers);
    router.delete('/users/:id', users_1.deleteauser);
    router.patch('/users/:id', users_1.updateuser);
};
//# sourceMappingURL=users.js.map