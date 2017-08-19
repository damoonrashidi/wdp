"use strict";
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
    ns.getArticles('news')
        .then(function (news) { return renderBox(news, boxes.filter(function (b) { return b.name === 'news'; })[0].box); });
    ns.getArticles('tech')
        .then(function (tech) { return renderBox(tech, boxes.filter(function (b) { return b.name === 'tech'; })[0].box); });
    ns.reddit()
        .then(function (reddit) { return renderBox(reddit, boxes.filter(function (b) { return b.name === 'reddit'; })[0].box); });
    ns.hackerNews()
        .then(function (hn) { return renderBox(hn, boxes.filter(function (b) { return b.name === 'hn'; })[0].box); });
    ns.crypto().then(function (cryptoGraph) { return renderGraph(cryptoGraph); });
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
