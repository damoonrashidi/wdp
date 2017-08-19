"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var blessed = require("blessed");
var screen = blessed.screen({ smartCSR: true });
screen.title = "Waddup!?";
var threads_1 = require("threads");
var news_service_1 = require("./services/news.service");
var _1 = require("./boxes/");
var ns = new news_service_1.NewsService();
var boxes = [
    {
        name: 'reddit',
        box: _1.redditBox,
        data: ns.reddit
    },
];
var _loop_1 = function (box) {
    screen.append(box.box);
    var thread = threads_1.spawn(function (data, done) {
        data().then(function (d) { return done(d); });
    });
    thread.send(box.data);
    thread.on('message', function (items) {
        console.log("got items", items);
        renderBox(items, box.box);
        thread.kill();
    });
};
for (var _i = 0, boxes_1 = boxes; _i < boxes_1.length; _i++) {
    var box = boxes_1[_i];
    _loop_1(box);
}
function initialRender() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
function renderBox(items, box) {
    var list = blessed.list({
        items: items.map(function (article) { return article.title; }),
        mouse: true,
        style: {
            selected: { bg: "#0f0", fg: "#000" }
        }
    });
    screen.render();
    box.append(list);
    screen.render();
}
function renderGraph(line) {
    screen.append(line);
    line.setData(crypto);
    screen.render();
}
screen.key(['escape', 'q', 'C-c'], function () { return process.exit(0); });
screen.render();
initialRender();
