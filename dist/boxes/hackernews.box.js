"use strict";
exports.__esModule = true;
var blessed = require("blessed");
exports.hnBox = blessed.box({
    name: 'hn',
    top: '0',
    left: '50%',
    width: '50%',
    height: '50%',
    label: 'Hacker News',
    border: {
        type: 'line'
    },
    style: {
        fg: '#0f0',
        border: {
            fg: '#555'
        },
        focus: { border: { fg: '#f00' } }
    }
});
