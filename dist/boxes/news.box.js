"use strict";
exports.__esModule = true;
var blessed = require("blessed");
var box = blessed.box({
    name: 'news',
    top: '50%',
    left: '0',
    width: '50%',
    height: '25%',
    label: 'News',
    scrollable: true,
    border: {
        type: 'line'
    },
    style: {
        fg: '#fff',
        border: {
            fg: '#555'
        },
        focus: { border: { fg: '#f00' } }
    }
});
exports["default"] = box;
