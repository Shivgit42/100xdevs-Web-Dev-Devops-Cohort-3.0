"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
app.get("/signup", function (req, res) {
    res.send("Hello there");
});
app.get("/signin", function (req, res) {
    res.send("Hello there");
});
app.get("/chat", function (req, res) {
    res.send("Hello there");
});
app.listen(3001);
