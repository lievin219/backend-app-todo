"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.use((0, compression_1.default)());
app.use(body_parser_1.default.json());
const server = http_1.default.createServer(app);
server.listen(5000, () => {
    console.log('live server runnning on http://localhost:2000');
});
const mong0db_url = "mongodb+srv://gakizalievin219:xArZEUuOWvxyaT8S@cluster0.0pekmzw.mongodb.net/";
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect(mong0db_url);
mongoose_1.default.connection.on("error", (error) => {
    console.log(error);
});
app.use("/", (0, routes_1.default)());
//datbase password:xArZEUuOWvxyaT8S
//# sourceMappingURL=index.js.map