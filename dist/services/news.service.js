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
var node_fetch_1 = require("node-fetch");
var NewsService = (function () {
    function NewsService() {
        this.techAPI = "https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=ee582714b32645c8a48b8601e7267063";
        this.newsAPI = "https://newsapi.org/v1/articles?source=al-jazeera-english&sortBy=top&apiKey=ee582714b32645c8a48b8601e7267063";
        this.hnAPI = "https://hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=points%3E100";
        this.redditAPI = "https://www.reddit.com/user/tehRash/m/work.json";
        this.ccAPI = "https://min-api.cryptocompare.com/data/histohour?fsym=ETH&tsym=USD&limit=60&aggregate=3&e=CCCAGG";
    }
    NewsService.prototype.getArticles = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var req, _a, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(type === 'news')) return [3 /*break*/, 2];
                        return [4 /*yield*/, node_fetch_1["default"](this.newsAPI)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, node_fetch_1["default"](this.techAPI)];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        req = _a;
                        return [4 /*yield*/, req.json()];
                    case 5: return [4 /*yield*/, (_b.sent())];
                    case 6:
                        data = _b.sent();
                        return [2 /*return*/, data.articles.map(function (article) { return ({
                                title: article.title,
                                description: article.description,
                                author: article.author,
                                url: article.url
                            }); })];
                }
            });
        });
    };
    NewsService.prototype.hackerNews = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, node_fetch_1["default"](this.hnAPI)];
                    case 1: return [4 /*yield*/, (_a.sent()).json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data.hits.map(function (article) { return ({
                                title: "(" + article.points + " | " + article.num_comments + ") " + article.title,
                                description: "",
                                author: article.author,
                                url: article.url ? article.url : "https://news.ycombinator.com/item?id=" + article.objectID
                            }); })];
                }
            });
        });
    };
    NewsService.prototype.reddit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, node_fetch_1["default"](this.redditAPI)];
                    case 1: return [4 /*yield*/, (_a.sent()).json()];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, res.data.children.map(function (article) { return ({
                                title: "(" + article.data.score + " | " + article.data.num_comments + ") " + article.data.title,
                                url: article.data.url,
                                author: article.data.author,
                                description: ""
                            }); })];
                }
            });
        });
    };
    NewsService.prototype.crypto = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, node_fetch_1["default"](this.ccAPI)];
                    case 1: return [4 /*yield*/, (_a.sent()).json()];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, {
                                title: 'ETH',
                                x: res.Data.map(function (btc) { return new Date(btc.time * 1000).toTimeString().substr(0, 8); }),
                                y: res.Data.map(function (btc) { return btc.close; })
                            }];
                }
            });
        });
    };
    return NewsService;
}());
exports.NewsService = NewsService;
