"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateuserbyid = exports.deleteuserbyid = exports.createUser = exports.getuserByid = exports.getuserbySession = exports.getuserByEmail = exports.getUsers = exports.usermodel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const usersschema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true
    },
    todo: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    authentication: {
        password: {
            type: String,
            required: true,
            select: false
        },
        salt: {
            type: String,
            required: true,
            select: false
        },
        sessionToken: {
            type: String,
            select: false
        }
    }
});
exports.usermodel = mongoose_1.default.model('User', usersschema);
const getUsers = () => exports.usermodel.find();
exports.getUsers = getUsers;
const getuserByEmail = (email) => exports.usermodel.findOne({ email });
exports.getuserByEmail = getuserByEmail;
const getuserbySession = (sessionToken) => exports.usermodel.findOne({
    'authentication.sessionToken': sessionToken
});
exports.getuserbySession = getuserbySession;
const getuserByid = (id) => exports.usermodel.findById(id);
exports.getuserByid = getuserByid;
const createUser = (values) => new exports.usermodel(values).save().then((user) => user.toObject());
exports.createUser = createUser;
const deleteuserbyid = (id) => exports.usermodel.findOneAndDelete({ _id: id });
exports.deleteuserbyid = deleteuserbyid;
const updateuserbyid = (id, values) => exports.usermodel.findOneAndUpdate({ id, values });
exports.updateuserbyid = updateuserbyid;
//# sourceMappingURL=users.js.map