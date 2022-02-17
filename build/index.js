"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 5000;
//set endpoint
app.get('/', (req, res) => {
    res.send('Hello, World.');
});
app.get('/api', (req, res) => {
    res.send('it is api');
});
// check port to avoid already using
app.listen(port, () => console.log('Listening on' + port));
exports.default = app;
