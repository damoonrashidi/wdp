#!/usr/bin/env node
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
var cp = require("child_process");
var news_service_1 = require("./services/news.service");
var ns = new news_service_1.NewsService();
var news, tech, reddit, hn, crypto;
var screen = blessed.screen({ smartCSR: true });
screen.title = "Waddup!?";
//import boxes after screen is set up, otherwise blessed throws an error
var reddit_box_1 = require("./boxes/reddit.box");
var hackernews_box_1 = require("./boxes/hackernews.box");
var news_box_1 = require("./boxes/news.box");
var tech_box_1 = require("./boxes/tech.box");
var crypto_box_1 = require("./boxes/crypto.box");
var boxes = [
    { name: 'reddit', box: reddit_box_1["default"], url: 'https://www.reddit.com/user/tehRash/m/work' },
    { name: 'hn', box: hackernews_box_1["default"], url: 'https://news.ycombinator.com' },
    { name: 'news', box: news_box_1["default"], url: 'http://www.aljazeera.com/news/' },
    { name: 'tech', box: tech_box_1["default"], url: 'https://thenextweb.com' },
];
var currentlyFocusedBox = 0;
boxes[0].box.focus();
for (var _i = 0, boxes_1 = boxes; _i < boxes_1.length; _i++) {
    var b = boxes_1[_i];
    screen.append(b.box);
    b.box.on('focus', function () { return screen.render(); });
}
function initialRender() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ns.getArticles('news')];
                case 1:
                    news = _a.sent();
                    return [4 /*yield*/, ns.getArticles('tech')];
                case 2:
                    tech = _a.sent();
                    return [4 /*yield*/, ns.reddit()];
                case 3:
                    reddit = _a.sent();
                    return [4 /*yield*/, ns.hackerNews()];
                case 4:
                    hn = _a.sent();
                    return [4 /*yield*/, ns.crypto()];
                case 5:
                    crypto = _a.sent();
                    renderBox(news, boxes.filter(function (b) { return b.name === 'news'; })[0].box);
                    renderBox(tech, boxes.filter(function (b) { return b.name === 'tech'; })[0].box);
                    renderBox(reddit, boxes.filter(function (b) { return b.name === 'reddit'; })[0].box);
                    renderBox(hn, boxes.filter(function (b) { return b.name === 'hn'; })[0].box);
                    renderGraph(crypto_box_1["default"]);
                    return [2 /*return*/];
            }
        });
    });
}
function renderBox(items, box) {
    var list = blessed.list({
        items: items.map(function (article) { return "" + article.title; }),
        mouse: true,
        style: {
            selected: { bg: "#0f0", fg: "#000" }
        }
    });
    list.on('select', function (item) {
        try {
            var index = list.getItemIndex(item);
            var url = {
                'reddit': reddit[index].url,
                'news': news[index].url,
                'tech': tech[index].url,
                'hn': hn[index].url
            }[list.parent.options.name];
            cp.exec("open -a \"Google Chrome\" " + url);
        }
        catch (e) {
        }
    });
    box.append(list);
    screen.render();
}
function renderGraph(line) {
    screen.append(line);
    line.setData(crypto);
    screen.render();
}
screen.key(['escape', 'q', 'C-c'], function () { return process.exit(0); });
screen.key(['n'], function () {
    currentlyFocusedBox = Math.min(currentlyFocusedBox + 1, boxes.length - 1);
    boxes[currentlyFocusedBox].box.focus();
});
screen.key(['p'], function () {
    currentlyFocusedBox = Math.max(currentlyFocusedBox - 1, 0);
    boxes[currentlyFocusedBox].box.focus();
});
screen.key(['o'], function () {
    cp.exec("open -a \"Google Chrome\" " + boxes[currentlyFocusedBox].url);
});
screen.render();
initialRender();
