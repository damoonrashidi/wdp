"use strict";
exports.__esModule = true;
var blessed = require("blessed");
exports.redditBox = blessed.box({
    name: 'reddit',
    top: '0',
    left: '0',
    width: '50%',
    height: '50%',
    content: '',
    tags: true,
    label: 'Reddit',
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
